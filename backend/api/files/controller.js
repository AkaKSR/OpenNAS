const mysql = require('mysql_improve');
const env = require('../../env/env');
const crypto = require('../../lib/cipher/aes-256-cbc');
const fs = require('fs');
const fileSplit = require('split-file');
const fileSql = require('../../sql/files');
const mime = require('mime');

const fileSplitCnt = 4;

async function getEnvFile() {
    const uuid = await fs.readFileSync('/srv/OpenNAS/conf/uuid/uuid');
    crypto.setKey(uuid.toString().split("-")[0]);
    const envfile = await fs.readFileSync('/srv/OpenNAS/conf/env/env.bin');
    const decrypt = await crypto.decrypt(envfile.toString('utf-8'));
    const envJson = JSON.parse(decrypt).form;

    // Test Code
    env.setEnvUser(envJson);
    env.envData.database = 'open_nas_db';
    mysql.dbConfigJSON(env.envData);
    // return envJson;
    // return mysql;
}

module.exports = {
    upload: async function (data) {
        var queryString;

        await getEnvFile();

        return new Promise(async function (resolve, reject) {
            var arr = [];

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
                        FILE_KEY: fileInfo.insertId,
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
    download: async function (params) {
        var queryString;

        await getEnvFile();

        return new Promise(async function (resolve, reject) {
            queryString = fileSql.getSplitData(params.FILE_KEY);
            var splitData = await mysql.query(queryString);

            var fileArr = [];

            for (var i = 0; i < splitData.length; i++) {
                fileArr.push(splitData[i].FILE_PATH);
            }

            var file = await fileSplit.mergeFiles(fileArr, `/data01/tmp/${params.FILE_SAVE_NM}${splitData[0].EXT}`);
            var mimeType = mime.getType(file);
            var fileName = splitData[0].FILE_ORI_NM;

            resolve({
                file, mimeType, fileName
            });
        });
    },
    getList: async function (data) {
        var queryString = fileSql.getList();
        await getEnvFile();

        return new Promise(async function (resolve, reject) {
            var result = await mysql.query(queryString);

            resolve(result);
        });
    },
    deleteFile: async function (params) {
        await getEnvFile();

        const FILE_KEY = params.FILE_KEY;

        var queryString = fileSql.getFileInfo(FILE_KEY);
        var getFileInfo = await mysql.query(queryString);

        var fileName = getFileInfo[0].FILE_SAVE_NM;

        // 파일 삭제 로직
        for (var i = 1; i <= fileSplitCnt; i++) {
            fs.unlinkSync(`/data01/node0${i-1}/${fileName}.sf-part${i}`);
        }
        fs.unlinkSync(`/data01/splitBin/${fileName}.bin`);

        // DB 데이터 삭제 로직
        queryString = fileSql.deleteFile(FILE_KEY);
        var deleteFile = await mysql.query(queryString);

        console.log(deleteFile);

        return deleteFile;
    }
}