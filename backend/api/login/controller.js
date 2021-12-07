const mysql = require('mysql_improve');
const env = require('../../env/env');
const loginSql = require('../../sql/login');
const fs = require('fs');
const crypto = require('../../lib/cipher/aes-256-cbc');

async function getEnvFile() {
    const uuid = await fs.readFileSync('/srv/OpenNAS/conf/uuid/uuid');
    crypto.setKey(uuid.toString().split("-")[0]);
    const envfile = await fs.readFileSync('/srv/OpenNAS/conf/env/env.bin');
    const decrypt = await crypto.decrypt(envfile.toString('utf-8'));
    const envJson = JSON.parse(decrypt).form;
    return envJson;
}

module.exports = {
    login: async function (params) {
        // TODO mysql 새로 불러오자
        var queryString = loginSql.login(params.USER_ID);

        const envJson = await getEnvFile();

        env.setEnvUser(envJson);
        env.envData.database = 'open_nas_db';
        mysql.dbConfigJSON(env.envData);

        return new Promise(async function (resolve, reject) {
            var account_info = await mysql.query(queryString);

            queryString = loginSql.getPassword(params.PASSWORD);
            var password_info = await mysql.query(queryString);

            if (account_info.length != 0) {
                if (account_info[0].USER_PASS == password_info[0].PASSWORD) {
                    queryString = loginSql.insertLoginLog(account_info[0].USER_ID, "Y", params.IPAddr);
                    await mysql.query(queryString);

                    account_info[0].USER_PASS = null;
                    account_info[0].CREATED_AT = null;

                    resolve({
                        ACCOUNT: account_info[0],
                        result: true
                    });
                } else {
                    queryString = loginSql.insertLoginLog(params.USER_ID, "N", params.IPAddr);
                    await mysql.query(queryString);

                    resolve({
                        ACCOUNT: "invalid",
                        result: false
                    });
                }
            } else {
                queryString = loginSql.insertLoginLog(params.USER_ID, "N", params.IPAddr);
                await mysql.query(queryString);

                resolve({
                    ACCOUNT: "invalid",
                    result: false
                });
            }
        });
    }
}