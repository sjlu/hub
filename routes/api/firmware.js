var express = require('express');
var router = express.Router();
var firmware = require('../../lib/firmware');
var middlewares = require('../../lib/middlewares');
var async = require('async');

router.use(middlewares.auth.requiresAdmin);

router.get('/', function(req, res, next) {
  firmware.list(function(err, list) {
    if (err) return next(err);
    res.json(list);
  });
});

module.exports = router;