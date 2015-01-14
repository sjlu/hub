var express = require('express');
var router = express.Router();
var models = require('../../lib/models');
var async = require('async');
var deviceKeys = require('../../lib/device_keys');
var middlewares = require('../../lib/middlewares');

router.use(middlewares.auth.requiresAdmin);

router.post('/:id', function(req, res, next) {
  var sparkId = req.body.deviceID;
  var pubKey = req.body.publicKey;

  async.parallel([
    function(cb) {
      var device = new models.Device({
        spark_id: sparkId,
        device_key: pubKey
      });

      device.save(cb);
    },
    function(cb) {
      deviceKeys.save(deviceId, pubKey, cb);
    }
  ], function(err) {
    if (err) return next(err);
    res.send();
  });

});

module.exports = router;