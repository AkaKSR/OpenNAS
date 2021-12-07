module.exports = {
    existDB: function () {
        return `SHOW DATABASES LIKE 'open_nas_db';`;
    },
    existUser: function () {
        return `SELECT USER FROM USER WHERE USER = 'open_nas';`;
    },
    createDB: function () {
        return `CREATE DATABASE open_nas_db DEFAULT CHARACTER SET UTF8;`;
    },
    createUser: function (db_onas_password) {
        return `CREATE USER 'open_nas'@'%' IDENTIFIED BY '${db_onas_password}';`;
    },
    grantUser: function (db_onas_password) {
        return `GRANT ALL PRIVILEGES ON open_nas_db.* TO 'open_nas'@'%' IDENTIFIED BY '${db_onas_password}';`;
    },
    createUserInfo: function () {
        return `
            CREATE TABLE USER_INFO (
                USER_NUM INT PRIMARY KEY AUTO_INCREMENT,
                USER_ID VARCHAR (20) NOT NULL,
                USER_PASS VARCHAR (255) NOT NULL,
                USER_NAME VARCHAR (32) NOT NULL,
                EMAIL VARCHAR (100),
                ROLE VARCHAR (2) NOT NULL,
                CONFIRM VARCHAR (2) DEFAULT 'Y',
                CREATED_AT TIMESTAMP DEFAULT NOW()
            ) ENGINE = INNODB ;
        `;
    },
    createLoginLog: function () {
        return `
            CREATE TABLE \`LOGIN_LOG\` (
                \`ID\` INT PRIMARY KEY AUTO_INCREMENT,
                USER_ID VARCHAR(20) NOT NULL,
                CONFIRM VARCHAR(2) NOT NULL,
                ACCESS_IP VARCHAR(20) NOT NULL,
                CREATED_AT TIMESTAMP DEFAULT NOW()
            ) ENGINE = INNODB ;
        `;
    },
    insertAdminAccount: function () {
        return `
            INSERT INTO USER_INFO (
                USER_ID,
                USER_PASS,
                USER_NAME,
                EMAIL,
                ROLE
            ) 
            VALUES
                (
                    'admin',
                    PASSWORD('admin'),
                    '관리자',
                    'null@null.com',
                    '99'
                ) ;
        `;
    },
    createFileInfo: function () {
        return `
            CREATE TABLE FILE_INFO (
                FILE_KEY INT PRIMARY KEY AUTO_INCREMENT,
                USER_NUM INT NOT NULL,
                FOREIGN KEY (USER_NUM) REFERENCES USER_INFO(USER_NUM) ON DELETE CASCADE,
                FILE_ORI_NM VARCHAR(255) NOT NULL,
                FILE_SAVE_NM VARCHAR(255) NOT NULL,
                SIZE INT NOT NULL,
                EXT VARCHAR(20) NOT NULL,
                UPLOAD_DATE TIMESTAMP DEFAULT NOW()
            ) ENGINE = INNODB ;
        `;
    },
    createSplitFileInfo: function () {
        return `
            CREATE TABLE SPLIT_INFO (
                SPLIT_KEY INT PRIMARY KEY AUTO_INCREMENT,
                FILE_KEY INT NOT NULL,
                FOREIGN KEY (FILE_KEY) REFERENCES FILE_INFO(FILE_KEY) ON DELETE CASCADE,
                SEQ INT NOT NULL,
                SPLIT_FILE_NM VARCHAR(255) NOT NULL,
                FILE_PATH VARCHAR(255) NOT NULL,
                SIZE INT NOT NULL,
                UPLOAD_DATE TIMESTAMP DEFAULT NOW()
            ) ENGINE = INNODB ;
        `;
    },
    createOpenNasInfo: function () {
        return `
            CREATE TABLE \`OPENNAS_INFO\` (
                \`ID\` int NOT NULL AUTO_INCREMENT,
                \`KEY\` varchar(30) NOT NULL,
                \`VALUE\` longtext,
                PRIMARY KEY (\`ID\`)
            ) ENGINE = INNODB ;
        `;
    },
    useONAS: function () {
        return `USE open_nas_db;`;
    },
    insertUUID: function (key, value) {
        return `INSERT INTO OPENNAS_INFO (\`KEY\`, \`VALUE\`) VALUES ('${key}', '${value}')`;
    }
}