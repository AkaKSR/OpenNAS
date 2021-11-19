var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer({
    dest: '/data01/tmp/'
});

// import Controller
const controller = require('../api/files/controller');

router.get('/', function (req, res) {
    res.send('File Manager Router');
});

router.post('/upload', upload.single('file'), async function (req, res) {
    var data = req.file;
    
    var files = await controller.upload(data);
    res.send(files);
});

router.get('/download', async function (req, res) {
    var data = req.query.bin;

    var files = await controller.download(data);
    res.send(files);
});

router.get('/getList', async function (req, res) {
    var files = await controller.getList();
    res.send(files);
});

module.exports = router;