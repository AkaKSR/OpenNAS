const crypto = require('crypto');

const ENCRYPTION_KEY = 'abcdefghijklmnop'.repeat(2);
const IV_LENGTH = 16;
const algorithm = 'aes-256-cbc';

function encrypt(data) {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(algorithm,
        Buffer.from(ENCRYPTION_KEY),
        iv);
    const encrypted = cipher.update(data);

    return (iv.toString('hex') + ':' + Buffer.concat([encrypted, cipher.final()]).toString('hex'));
}

function decrypt(data) {
    const textParts = data.split(':');
    const iv = Buffer.from(textParts.shift(), 'hex');
    const encryptedText = Buffer.from(textParts.join(":"), 'hex');
    const decipher = crypto.createDecipheriv(algorithm,
        Buffer.from(ENCRYPTION_KEY),
        iv);
    const decrypted = decipher.update(encryptedText);

    return Buffer.concat([decrypted, decipher.final()]).toString();
}

function startApp() {
    const text = "암호화 할 데이터";
    const enc = encrypt(text);
    console.log('enc = ', enc);

    const dec = decrypt(enc);
    console.log('dec = ', dec);

    // var tmp = '0123456789'; // length: 10
    // console.log(tmp);
    // console.log(tmp.length + "\n");

    // if (tmp.length < 16) {
    //     for (var i = tmp.length; i < 16; i++) {
    //         tmp += "0";
    //     }
    //     console.log(tmp);
    //     console.log(tmp.length);
    // }
}

startApp();