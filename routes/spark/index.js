var express = require('express');
var router = express.Router();

router.use('/oauth', require('./oauth'));
router.use('/v1/provisioning', require('./provisioning'));

module.exports = router;