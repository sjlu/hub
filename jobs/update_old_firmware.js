var models = require('../lib/models');
var firmware = require('../lib/firmware');
var async = require('async');
var jobs = require('../lib/jobs');
var _ = require('lodash');

module.exports = function(job, done) {

  firmware.list(function(err, list) {
    if (err) return done(err);

    async.each(_.values(list), function(f, cb) {

      console.log(f);

      models.Device.find({
        firmware_name: f.name,
        firmware_version: {
          '$ne': f.version
        }
      }).exec(function(err, devices) {
        if (err) return next(err);

        async.each(devices, function(d, cb) {
          jobs.create('update_device_firmware', {
            device_id: d._id
          }).save(cb);
        }, cb)

      });

    }, done);
  })


}