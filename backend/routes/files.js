var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer({
    dest: '/data01/tmp/'
});
const fs = require('fs');
const iconvLite = require('iconv-lite');

// import Controller
const controller = require('../api/files/controller');

function getDownloadFilename(req, filename) {
    // var header = req.headers['user-agent'];

    // if (header.includes("MSIE") || header.includes("Trident")) { 
    //     return encodeURIComponent(filename).replace(/\\+/gi, "%20");
    // } else if (header.includes("Chrome")) {
    //     return encodeURIComponent(filename).replace(/\\+/gi, "%20");
    // } else if (header.includes("Opera")) {
    //     return iconvLite.decode(iconvLite.encode(filename, "UTF-8"), 'ISO-8859-1');
    // } else if (header.includes("Firefox")) {
    //     return iconvLite.decode(iconvLite.encode(filename, "UTF-8"), 'ISO-8859-1');
    // }
    
    // return filename;

    return encodeURIComponent(filename).replace(/\\+/gi, "%20");
}

router.get('/', function (req, res) {
    res.send('File Manager Router');
});

router.post('/upload', upload.single('file'), async function (req, res) {
    var data = req.file;
    data.USER_NUM = req.query.USER_NUM;

    var files = await controller.upload(data);
    res.send(files);
});

router.get('/download', async function (req, res) {
    var files = await controller.download(req.query);
    var fileName = files.fileName;
    var filePath = files.file;

    res.setHeader('Content-Disposition', `attachment; filename=${getDownloadFilename(req, fileName)}`);
    res.sendFile(filePath);

    res.on('close', () => {
        fs.unlinkSync(filePath);
    });
});

router.get('/getList', async function (req, res) {
    var files = await controller.getList();
    res.send(files);
});

router.delete('/deleteFile', async function (req, res) {
    var result = await controller.deleteFile(req.query);
    res.send(result);
});

module.exports = router;