var express = require('express');
var router = express.Router();
var controller = require('../api/init/controller');

router.get('/validInstall', async (req, res) => {
    var result = await controller.validInstall();
    res.send(result);
});

router.post('/install', async (req, res) => {
    var result = await controller.install(req.body);
    res.send(result);
})

module.exports = router;