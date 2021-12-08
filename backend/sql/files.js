module.exports = {
    uploadFile: {
        fileInfo: function (data) {
            var ext = `.${data.originalname.split(".")[data.originalname.split(".").length - 1]}`;
            return `
                    INSERT INTO FILE_INFO (
                        USER_NUM,
                        FILE_ORI_NM,
                        FILE_SAVE_NM,
                        SIZE,
                        EXT
                    ) 
                    VALUES
                        (${data.USER_NUM}, "${data.originalname}", "${data.filename}", ${data.size}, "${ext}") ;
                    `
        },
        splitInfo: function (data) {
            return `
                INSERT INTO SPLIT_INFO (
                    FILE_KEY,
                    SEQ,
                    SPLIT_FILE_NM,
                    FILE_PATH
                ) 
                VALUES
                    (${data.FILE_KEY}, ${data.SEQ}, '${data.SPLIT_FILE_NM}', '${data.FILE_PATH}') ;
            `
        }
    },
    getList: function () {
        return `
            SELECT 
                * 
            FROM
                FILE_INFO ;
        `;
    },
    getSplitData: function (FILE_KEY) {
        return `
            SELECT 
                SPLIT_INFO.*,
                FILE_INFO.USER_NUM,
                FILE_INFO.FILE_ORI_NM,
                FILE_INFO.FILE_SAVE_NM,
                FILE_INFO.SIZE,
                FILE_INFO.EXT
            FROM
                SPLIT_INFO
                LEFT JOIN FILE_INFO
                ON SPLIT_INFO.FILE_KEY = FILE_INFO.FILE_KEY
            WHERE FILE_INFO.FILE_KEY = ${FILE_KEY} ;
        `;
    },
    deleteFile: function (FILE_KEY) {
        return `
            DELETE 
            FROM
                FILE_INFO 
            WHERE FILE_KEY = ${FILE_KEY} ;
        `;
    },
    getFileInfo: function (FILE_KEY) {
        return `
            SELECT
                *
            FROM
                FILE_INFO
            WHERE FILE_KEY = ${FILE_KEY} ;
        `;
    }
}