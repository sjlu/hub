var express = require('express');
var router = express.Router();

router.use('/oauth', require('./oauth'));

module.exports = router;