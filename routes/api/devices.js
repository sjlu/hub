var express = require('express');
var router = express.Router();
var spark = require('../../lib/spark');
var middlewares = require('../../lib/middlewares');
var models = require('../../lib/models');

router.use(middlewares.auth.requiresAdmin);

router.get('/', function(req, res, next) {

  var devices = models.Device.find({}, function(err, devices) {
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

module.exports = router;