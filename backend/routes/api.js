var express = require('express');
var router = express.Router();
var init = require('./init');
var files = require('./files');

router.use('/init', init);

router.use('/files', files);

module.exports = router;