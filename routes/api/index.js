var express = require('express');
var router = express.Router();

router.use('/admin', require('./admin'));
router.use('/devices', require('./devices'));

module.exports = router;