var winston = require('../lib/winston');
var models = require('../lib/models');
var firmware = require('../lib/firmware');
var spark = require('../lib/spark');

module.exports = function(job, done) {

  var coreId = job.data.core_id;

  models.Device.findOne({
    spark_id: coreId
  }).exec(function(err, device) {
    if (err) return done(err);
    if (!device) return done(new Error("device not found"))
    if (!device.firmware_name) {
      winston.warn("device has no set firmware", {
        core_id: coreId
      });
      return done();
    }

    firmware.list(function(err, firmware) {
      if (err) return done(err);
      if (!firmware[device.firmware_name]) return done(new Error("device's set firmware does not exist"))

      var firmwareToFlashWith = firmware[device.firmware_name];

      if (firmwareToFlashWith.version === device.firmware_version) {
        winston.info("device is already up to date", {
          core_id: coreId,
          firmware_name: device.firmware_name,
          firmware_version: device.firmware_version
        });
        return done();
      }

      device.getSparkDevice(function(err, sparkDevice) {
        if (err) return done(err);

        if (!sparkDevice.connected) {
          winston.warn("device went offline before we could update", {
            core_id: coreId
          });
          return done();
        }

        sparkDevice.flash([firmwareToFlashWith.file], function(err, data) {
          if (err) return done(err);

          device.firmware_version = firmwareToFlashWith.version;
          device.save(done);
        });
      });

    });

  });

  done();

}