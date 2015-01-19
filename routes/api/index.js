var express = require('express');
var router = express.Router();

router.use('/admin', require('./admin'));
router.use('/devices', require('./devices'));
router.use('/users', require('./users'));

module.exports = router;