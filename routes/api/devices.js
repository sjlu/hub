var express = require('express');
var router = express.Router();
var spark = require('../../lib/spark');
var middlewares = require('../../lib/middlewares');
var models = require('../../lib/models');
var _ = require('lodash');
var async = require('async');
var firmware = require('../../lib/firmware');

router.use(middlewares.auth.requiresUser);

router.get('/', function(req, res, next) {

  models.Device.find({
    _uid: req.user._id
  }).exec(function(err, devices) {
    if (err) return next(err);
    res.json(devices);
  })

});

router.post('/', function(req, res, next) {

  var claimCode = req.body.claim_code;

  models.Device.findOne({
    claim_code: claimCode
  }, function(err, device) {
    if (err) return next(err);
    if (!device) return res.json(404, {"error":"device not found"})
    if (device._uid) return res.json(400, {"error":"device already claimed"});

    device._uid = req.user._id;
    device.save(function(err, device) {
      if (err) return next(err);
      res.json(device);
    })

  })

});

module.exports = router;
