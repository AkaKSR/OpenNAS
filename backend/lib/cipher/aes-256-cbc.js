const { Buffer } = require('buffer');
const {
    scrypt,
    scryptSync,
    randomFill,
    createCipheriv,
    createDecipheriv
} = require('crypto');

var password = null;
const algorithm = 'aes-192-cbc';

function encodeBase64(data) {
    var result = Buffer.from(data, 'utf8').toString('base64');
    return result;
}

function decodeBase64(data) {
    return Buffer.from(data, "base64").toString('utf8');
}

module.exports = {
    setKey: (data) => {
        password = data;
    },
    encrypt: (data) => {
        return new Promise(async function (resolve, reject) {
            scrypt(password, 'salt', 24, (err, key) => {
                if (err) throw err;
                // Then, we'll generate a random initialization vector
                randomFill(new Uint8Array(16), (err, iv) => {
                    if (err) throw err;

                    // Once we have the key and iv, we can create and use the cipher...
                    const cipher = createCipheriv(algorithm, key, iv);

                    let encrypted = '';
                    cipher.setEncoding('base64');

                    cipher.on('data', (chunk) => encrypted += chunk);
                    cipher.on('end', () => {
                        // console.log('encrypted = ', encrypted);
                    });

                    // cipher.write(data);
                    cipher.write(encodeBase64(data));
                    cipher.end();
                    resolve(encrypted);
                });
            });
        })
    },
    decrypt: (data) => {
        console.log('decrypt data = ', data);
        return new Promise(async function (resolve, reject) {
            const key = scryptSync(password, 'salt', 24);
            const iv = Buffer.alloc(16, 0);

            const decipher = createDecipheriv(algorithm, key, iv);

            let decrypted = '';
            decipher.on('readable', () => {
                while (null !== (chunk = decipher.read())) {
                    decrypted += chunk.toString('base64');
                }
            });
            decipher.on('end', () => {
                console.log('decrypted = ', decrypted);
            });

            // decipher.write(data, 'base64', (err) => {
            decipher.write(decodeBase64(data), 'base64', (err) => {
                if (err) {
                    console.log(err);
                }
            })
            decipher.end();

            resolve(decrypted);
        });
    }
}