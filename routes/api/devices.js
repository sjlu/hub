var express = require('express');
var router = express.Router();
var spark = require('../../lib/spark');
var middlewares = require('../../lib/middlewares');
var models = require('../../lib/models');
var _ = require('lodash');
var async = require('async');

router.use(middlewares.auth.requiresAdmin);

router.get('/', function(req, res, next) {

  var devices = models.Device.find().populate('_uid').exec(function(err, devices) {
    if (err) return next(err)
      res.json(devices);
  });

});

router.post('/', function(req, res, next) {

  var deviceId = req.body.device_id;

  var device = models.Device({
    device_id: deviceId
  });

  spark.claimCore(deviceId, function(err, data) {
    if (err) return next(err);
    device.save(function(err) {
      if (err) return next(err);
      res.send();
    });
  });

});

var getDeviceFromParams = function(req, res, next) {
  models.Device.findById(req.params.device_id, function(err, device) {
    if (err) return next(err);
    req.device = device;
    next();
  });
}

router.get('/:device_id', getDeviceFromParams, function(req, res, next) {

  async.parallel({
    firmware_current: function(cb) {
      req.device.isFirmwareCurrent(cb);
    },
    // spark_device: function(cb) {
    //   req.device.getSparkDevice(cb);
    // }
  }, function(err, data) {
    if (err) return next(err);
    var device = req.device.toJSON();
    res.json(_.extend(device, data));
  });

});

router.get('/:device_id/spark', getDeviceFromParams, function(req, res, next) {
  req.device.getSparkDevice(function(err, sparkDevice) {
    if (err) return next(err);
    res.json(sparkDevice);
  });
});

module.exports = router;