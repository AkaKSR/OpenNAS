const crypto = require('crypto');

var ENCRYPTION_KEY = null;
const IV_LENGTH = 16;
const algorithm = 'aes-256-cbc';

function padding(key) {
    if (key.length < 16) {
        for (var i = key.length; i < 16; i++) {
            key += "0";
        }

        return key.repeat(2);
    } else {
        return key.repeat(2);
    }
}

module.exports = {
    setKey: (data) => {
        ENCRYPTION_KEY = padding(data);
    },
    encrypt: (data) => {
        return new Promise(async function (resolve, reject) {
            const iv = crypto.randomBytes(IV_LENGTH);
            const cipher = crypto.createCipheriv(algorithm, Buffer.from(ENCRYPTION_KEY), iv);
            const encrypted = cipher.update(data);
            resolve(iv.toString('hex') + ":" + Buffer.concat([encrypted, cipher.final()]).toString('hex'));
        });
    },
    decrypt: (data) => {
        return new Promise(async function (resolve, reject) {
            const textParts = data.split(":");
            const iv = Buffer.from(textParts.shift(), 'hex');
            const encryptedText = Buffer.from(textParts.join(":"), 'hex');
            const decipher = crypto.createDecipheriv(algorithm, Buffer.from(ENCRYPTION_KEY), iv);
            const decrypted = decipher.update(encryptedText);

            resolve(Buffer.concat([decrypted, decipher.final()]).toString());
        });
    }
}