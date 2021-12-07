var express = require('express');
var router = express.Router();
var controller = require('../api/login/controller');
const requestIp = require('request-ip');

router.get('/login', async (req, res) => {
    var IPAddr = requestIp.getClientIp(req);

    if (IPAddr == "::1") {
        IPAddr = 'localhost';
    } else if (IPAddr.indexOf("::ffff:") != -1) {
        IPAddr = IPAddr.split("::ffff:")[1];
    }

    req.query.IPAddr = IPAddr;

    var result = await controller.login(req.query);
    res.send(result);
});

module.exports = router;