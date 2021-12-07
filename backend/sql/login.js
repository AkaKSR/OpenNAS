module.exports = {
    login: function (USER_ID) {
        return `SELECT * FROM USER_INFO WHERE USER_ID = "${USER_ID}";`;
    },
    getPassword: function (PASSWORD) {
        return `SELECT PASSWORD('${PASSWORD}') AS \`PASSWORD\`;`
    },
    insertLoginLog: function (USER_ID, CONFIRM, ACCESS_IP) {
        return `INSERT INTO LOGIN_LOG (USER_ID, CONFIRM, ACCESS_IP) VALUES ('${USER_ID}', '${CONFIRM}', '${ACCESS_IP}')`;
    }
}