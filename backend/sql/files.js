module.exports = {
    uploadFile: {
        fileInfo: function (data) {
            return `
                    INSERT INTO FILE_INFO (
                        USER_NUM,
                        FILE_ORI_NM,
                        FILE_SAVE_NM,
                        SIZE,
                        EXT
                    ) 
                    VALUES
                        (${data.USER_NUM}, "${data.originalname}", "${data.filename}", ${data.size}, "${data.mimetype}") ;
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
    }
}