const fs = require('fs');
const mysql = require('mysql');
const env = require('../../env/env');

function dbConnection(env) {
    return mysql.createPool({
        connectionLimit: env.connectionLimit,
        host: env.host,
        port: env.port,
        user: env.user,
        password: env.password
    });
}

function validONAS() {
    return fs.existsSync('/srv/OpenNAS');
}

function validDB() {
    var queryString = `SHOW DATABASES LIKE 'open_nas_db'`;
    var dbConn = dbConnection(env.envData);

    return new Promise(async function (resolve, reject) {
        await dbConn.getConnection((err, conn) => {
            if (err) {
                console.error("!!! DB Connection Exception !!!");
                console.error(err);
                resolve({
                    data: err,
                    result: false
                });
            }

            conn.query(queryString, function (err, res, fields) {
                if (err) {
                    console.error("!!! DB Query Exception !!!");
                    console.error(err);
                    resolve({
                        data: err,
                        result: false
                    });
                }

                if (res.length == 0) {
                    resolve({
                        data: res,
                        result: false
                    });
                } else {
                    resolve({
                        data: res,
                        result: true
                    });
                }
            });
        })
    });
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

        if (!await validDB()) {
            result.data.push("DB");
        }

        console.log(await validDB());

        if (result.data.length == 0) {
            result.valid = true;
        } else {
            result.valid = false;
        }
        
        return result;
    },
    install: async (data) => {
        // DB 정보 세팅
        env.setEnv(data);

        var queryString = `CREATE DATABASE open_nas_db DEFAULT CHARACTER SET UTF8;`;
        var dbConn = dbConnection(env.envData);

        return new Promise(async function (resolve, reject) {
            dbConn.getConnection((err, conn) => {
                if (err) {
                    console.error("!!! DB Connection Exception !!!");
                    console.error(err);
                    resolve({
                        data: err,
                        result: "Failed"
                    });
                }

                // Create DB
                conn.query(queryString, function (err, res, fields) {
                    if (err) {
                        console.error("!!! Create DB Exception !!!")
                        console.error(err);
                        resolve({
                            data: err,
                            result: "Failed"
                        });
                    }

                    // Create OpenNAS DB Account
                    queryString = `CREATE USER '${data.db_onas_user}'@'%' IDENTIFIED BY '${data.db_onas_password}'`;
                    conn.query(queryString, function (err, res, fields) {
                        if (err) {
                            console.error("!!! Create OpenNAS DB Account Exception !!!")
                            console.error(err);
                            resolve({
                                data: err,
                                result: "Failed"
                            });
                        }

                        // Grant OpenNAS DB Account
                        queryString = `GRANT ALL PRIVILEGES ON open_nas_db.* TO 'open_nas'@'%' IDENTIFIED BY '${data.password}'`;
                        conn.query(queryString, function (err, res, fields) {
                            if (err) {
                                console.error("!!! Grant OpenNAS DB Account Exception !!!");
                                console.error(err);
                                resolve({
                                    data: err,
                                    result: "Failed"
                                });
                            }

                            // Create Table
                        })
                    });
                    
                    // resolve({
                    //     data: res,
                    //     result: "Success"
                    // });
                });
            });
        });
    }
}