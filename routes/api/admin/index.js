var express = require('express');
var router = express.Router();

router.use('/devices', require('./devices'));
router.use('/firmware', require('./firmware'));

module.exports = router;