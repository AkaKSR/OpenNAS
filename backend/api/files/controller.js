const mysql = require('mysql_improve');
const env = require('../../env/env');
const crypto = require('../../lib/cipher/aes-256-cbc');
const fs = require('fs');
const fileSplit = require('split-file');
const fileSql = require('../../sql/files');

async function getEnvFile() {
    const uuid = await fs.readFileSync('/srv/OpenNAS/conf/uuid/uuid');
    crypto.setKey(uuid.toString().split("-")[0]);
    const envfile = await fs.readFileSync('/srv/OpenNAS/conf/env/env.bin');
    const decrypt = await crypto.decrypt(envfile.toString('utf-8'));
    const envJson = JSON.parse(decrypt).form;
    return envJson;
}

module.exports = {
    upload: async function (data) {
        var queryString;

        const envJson = await getEnvFile();
        env.setEnvUser(envJson);
        env.envData.database = 'open_nas_db';
        mysql.dbConfigJSON(env.envData);

        return new Promise(async function (resolve, reject) {
            console.log(data);
            var arr = [];
            const fileSplitCnt = 4;

            // 업로드된 파일 분할
            fileSplit.splitFile(data.path, fileSplitCnt, '/data01/tmp/').then(async (names) => {
                // 원본 파일 삭제
                fs.unlinkSync('/data01/tmp/' + data.filename);

                // DB 기록
                queryString = fileSql.uploadFile.fileInfo(data);
                var fileInfo = await mysql.query(queryString);

                // 분할된 파일 이동
                for (var i = 1; i <= fileSplitCnt; i++) {
                    var target = '/data01/tmp/' + data.filename + '.sf-part' + i;
                    var dest = '/data01/node0' + (i - 1) + '/' + data.filename + '.sf-part' + i;

                    fs.copyFileSync(target, dest);

                    fs.unlinkSync(target);

                    names[i - 1] = dest;

                    var splitData = {
                        FILE_KEY: fileInfo.insertID,
                        SEQ: i,
                        SPLIT_FILE_NM: `${data.filename}.sf-part${i}`,
                        FILE_PATH: dest
                    };

                    queryString = fileSql.uploadFile.splitInfo(splitData);
                    await mysql.query(queryString);
                }

                // 분할 파일 기록정보 저장(bin 파일)
                fs.writeFileSync('/data01/splitBin/' + data.filename + '.bin', names.join("\n"));

                resolve(names);
            }).catch((err) => {
                console.log(err);
                resolve(err);
            });
        });
    },
    download: async function (data) {
        return new Promise(async function (resolve, reject) {
            var splitData = fs.readFileSync('/data01/splitBin/' + data + ".bin");

            var fileArr = splitData.toString().split("\n");

            console.log(fileArr);

            fileSplit.mergeFiles(fileArr, '/data01/tmp/' + data).then((response) => {
                console.log(response);
                resolve(response);
            }).catch((err) => {
                console.error(err);
                resolve(err);
            });

            // TODO 실제 파일을 클라이언트측으로 전송해줘야 한다.
        })
    },
    getList: async function (data) {
        return new Promise(async function (resolve, reject) {
            var files = fs.readdirSync('/data01/splitBin');
            // console.log(files);

            // TODO 파일 목록을 불러와서 클라이언트에 보내준다.

            for (var i = 0; i < files.length; i++) {
                files[i] = {
                    filename: files[i].split('.')[0],
                    splitBin: files[i]
                }
            }

            resolve(files);
            // var files = fs.readdirSync('split/');

            // console.log(files);

            // // http://localhost:10001/files/download?bin=

            // var downApi = 'http://localhost:10001/files/download?bin=';

            // for (var i = 0; i < files.length; i++) {
            //     files[i] = downApi + files[i];
            // }

            // resolve(files);
        })
    }
}