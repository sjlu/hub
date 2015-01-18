var express = require('express');
var router = express.Router();
var middlewares = require('../../../lib/middlewares');

router.use(middlewares.auth.requiresAdmin);

router.use('/devices', require('./devices'));
router.use('/firmware', require('./firmware'));

module.exports = router;