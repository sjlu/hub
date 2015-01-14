var express = require('express');
var router = express.Router();
var spark = require('../../lib/spark');
var middlewares = require('../../lib/middlewares');
var models = require('../../lib/models');
var _ = require('lodash');
var async = require('async');
var firmware = require('../../lib/firmware');

router.use(middlewares.auth.requiresAdmin);

router.get('/', function(req, res, next) {
  async.parallel({
    devices: function(cb) {
      models.Device.find().populate('_uid').exec(cb);
    },
    firmware: function(cb) {
      firmware.list(cb);
    }
  }, function(err, data) {
    var devices = data.devices;
    if (err) return next(err);

    data.devices = _.map(devices, function(d) {
      d = d.toJSON();

      if (
        d.firmware_name
        && data.firmware[d.firmware_name]
        && data.firmware[d.firmware_name].version == d.firmware_version
      ) {
        d.firmware_current = true;
      } else {
        d.firmware_current = false;
      }

      return d;
    });

    res.json(data.devices);
  });

});

router.post('/', function(req, res, next) {

  var sparkId = req.body.spark_id;

  var device = models.Device({
    spark_id: sparkId
  });

  spark.claimCore(sparkId, function(err, data) {
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
    if (!device) return res.send(404);
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

router.post('/:device_id/firmware', getDeviceFromParams, function(req, res, next) {
  if (!req.body.firmware) {
    return res.json(400, {"error": "firmware input missing"})
  }

  firmware.list(function(err, list) {
    if (!list[req.body.firmware]) {
      return res.json(401, {"error": "firmware not found"})
    }

    req.device.firmware_name = req.body.firmware;
    req.device.firmware_version = null;
    async.parallel({
      device: function(cb) {
        req.device.save(cb);
      },
      update_job: function(cb) {
        job.create('update_device_firmware', {
          device_id: req.device._id
        }).save(cb);
      }
    }, function(err, data) {
      if (err) return next(err);
      res.json(data.device);
    })
  })


});

module.exports = router;
