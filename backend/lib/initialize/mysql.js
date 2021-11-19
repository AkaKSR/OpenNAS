const mysql = require('mysql');

function dbConnection(env) {
    return mysql.createPool({
        connectionLimit: env.limit,
        host: env.host,
        port: env.port,
        user: env.user,
        password: env.password,
        // database: env.database
    });
}

module.exports = {
    vaildDB: (env) => {
        return new Promise(async function (resolve, reject) {
            var dbConn = dbConnection(env);
            var queryString = `SHOW DATABASES LIKE 'open_nas_db;`

            dbConn.getConnection(async (err, conn) => {
                if (err) {
                    console.error("!!! DataBase Connection Exception !!!");
                    console.error(err);
                    resolve(err);
                }

                await conn.query(queryString, async (error, res, fields) => {
                    if (error) {
                        console.error("!!! Query Exception !!!");
                        console.error(error);
                        resolve(error);
                    }

                    conn.release();

                    console.log(res);

                    resolve(res);

                    // if (res.length == 0) {
                    // }
                })
            })
        })
    }
}