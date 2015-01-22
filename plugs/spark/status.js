var jobs = require('../../lib/jobs');
var async = require('async');
var models = require('../../lib/models');

module.exports = function(id, data, cb) {

  models.Device.findOne({
    spark_id: id
  }).exec(function(err, device) {
    if (err) return cb(err);

    var funcs = [
      function(cb) {
        device.updateConnectionStatus(data === 'online', cb);
      }
    ];

    device.isFirmwareCurrent(function(err, current) {
      if (err) return cb(err);

      if (data === 'online') {
        if (!current) {
          funcs.push(function(cb) {
            jobs.create('update_device_firmware', {
              spark_id: id
            }).save(cb);
          });
        } else {
          funcs.push(function(cb) {
            jobs.create('sync_devices', {
              device_id: device._id
            }).save(cb);
          });
        }
      }

      async.parallel(funcs, cb);
    });

  });

}