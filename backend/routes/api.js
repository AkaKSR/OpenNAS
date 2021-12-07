var express = require('express');
var router = express.Router();
var init = require('./init');
var files = require('./files');
var auth = require('./auth');

router.use('/init', init);

router.use('/files', files);

router.use('/auth', auth);

module.exports = router;