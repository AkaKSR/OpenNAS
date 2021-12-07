const fs = require('fs');
const mkdirp = require('mkdirp');
const mysql = require('mysql_improve');
const uuid = require('uuid');
const env = require('../../env/env');
const crypto = require('../../lib/cipher/aes-256-cbc');
const initSql = require('../../sql/init');

const namespace = '856f6fba-840f-4d53-8317-4551e57435a2';

function validONAS() {
    return fs.existsSync('/srv/OpenNAS');
}

module.exports = {
    validInstall: async () => {
        var result = {
            valid: null,
            data: [],
        };

        if (!await validONAS()) {
            result.data.push("ONAS");
        }

        if (result.data.length == 0) {
            result.valid = true;
        } else {
            result.valid = false;
        }

        return result;
    },
    install: async (data) => {
        // 기본 폴더 생성
        await mkdirp.sync("/srv/OpenNAS/conf/uuid");
        await mkdirp.sync("/srv/OpenNAS/conf/env");

        // env.bin 생성
        const UUIDValue = uuid.v5(data.form.host, namespace);
        crypto.setKey(UUIDValue.split("-")[0]);
        const encrypt = await crypto.encrypt(JSON.stringify(data));
        await fs.writeFileSync('/srv/OpenNAS/conf/env/env.bin', encrypt);
        await fs.writeFileSync('/srv/OpenNAS/conf/uuid/uuid', UUIDValue);

        // env.bin 불러오기
        const envfile = await fs.readFileSync('/srv/OpenNAS/conf/env/env.bin');
        const decrypt = await crypto.decrypt(envfile.toString('utf-8'));

        const envJson = JSON.parse(decrypt).form;

        // DB 정보 세팅
        env.setEnvRoot(envJson);
        mysql.dbConfigJSON(env.envData);

        // DB 생성
        var queryString = initSql.createDB();
        const createDB = await mysql.query(queryString);

        // 유저 생성
        queryString = initSql.createUser(envJson.db_onas_password);
        const createUser = await mysql.query(queryString);

        // 유저 권한 할당
        queryString = initSql.grantUser(envJson.db_onas_password);
        const grantUser = await mysql.query(queryString);

        // OpenNAS DB 정보 세팅
        env.envData.database = 'open_nas_db';
        mysql.dbConfigJSON(env.envData);

        // USER_INFO 테이블 생성
        queryString = initSql.createUserInfo();
        const createUserInfo = await mysql.query(queryString);

        // LOGIN_LOG 테이블 생성
        queryString = initSql.createLoginLog();
        const createLoginLog = await mysql.query(queryString);

        // Admin 계정 추가
        queryString = initSql.insertAdminAccount();
        const insertAdminAccount = await mysql.query(queryString);

        // FILE_INFO 테이블 생성
        queryString = initSql.createFileInfo();
        const createFileInfo = await mysql.query(queryString);

        // SPLIT_FILE_INFO 테이블 생성
        queryString = initSql.createSplitFileInfo();
        const createSplitFileInfo = await mysql.query(queryString);

        // OPENNAS_INFO 테이블 생성
        queryString = initSql.createOpenNasInfo();
        const createOpenNasInfo = await mysql.query(queryString);

        // UUID 값 저장
        queryString = initSql.insertUUID("UUID", UUIDValue);
        const insertUUID = await mysql.query(queryString);

        return new Promise(async function (resolve, reject) {
            const result = {
                createDB, createUser, grantUser, createUserInfo, createLoginLog, insertAdminAccount, createFileInfo, createSplitFileInfo, createOpenNasInfo, insertUUID
            };
            resolve(result);
        });
    }
}