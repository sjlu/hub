var express = require('express');
var router = express.Router();

router.use('/spark', require('./spark'));

module.exports = router;