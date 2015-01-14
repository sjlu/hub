var jobs = require('../../lib/jobs');
var async = require('async');
var models = require('../../lib/models');

module.exports = function(id, data, cb) {
  async.parallel([
    function(cb) {
      if (data === 'online') {
        jobs.create('update_device_firmware', {
          spark_id: id
        }).save(cb);
      } else {
        cb();
      }
    },
    function(cb) {
      models.Device.find({
        spark_id: id
      }).exec(function(err, device) {
        if (err) return cb(err);

        var connected = false;
        if (data === 'online') {
          connected = true;
        }

        device.updateConnectionStatus(connected, cb);
      })
    }
  ], cb);


}