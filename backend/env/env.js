const fs = require('fs');

// 운영
var envData = {
    host: null,
    port: null,
    user: null,
    password: null,
    connectionLimit: 50
}

function envFileLoad() {
    console.log(fs.existsSync('/srv/OpenNAS/env/env.json'));
}

module.exports = {
    envData,
    setEnvUser: (data) => {
        envData.host = data.host;
        envData.port = data.port;
        envData.user = data.db_onas_user;
        envData.password = data.db_onas_password;
    },
    setEnvRoot: (data) => {
        envData.host = data.host;
        envData.port = data.port;
        envData.user = data.db_root_user;
        envData.password = data.db_root_password;
    },
    envFileLoad
}