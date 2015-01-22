var models = require('../lib/models');
var async = require('async');
var jobs = require('../lib/jobs');
var firmware = require('../lib/firmware');
var winston = require('../lib/winston');
var _ = require('lodash');

module.exports = function(job, done) {

  var findBy = {};
  if (job.data.device_id) {
    findBy._id = job.data.device_id
  } else if (job.data.user_id) {
    findBy._uid = job.data.user_id
  }

  models.Device.find(findBy).populate('_uid').exec(function(err, devices) {
    if (err) return done(err);

    async.each(devices, function(device, cb) {
      device.getSparkDevice(function(err, sparkDevice) {
        if (err) return cb(err);
        async.each(_.keys(sparkDevice.variables), function(variable, cb) {
          if (sparkDevice.functions.indexOf("set_" + variable) < 0) {
            return cb();
          }

          var variableData;
          if (device[variable]) {
            variableData = device[variable];
          } else if (device._uid[variable]) {
            variableData = device._uid[variable];
          } else {
            return cb();
          }

          sparkDevice.callFunction("set_" + variable, variableData, function(err) {
            if (err) return cb(err);
            sparkDevice.getVariable(variable, function(err, returnedSparkVariableData) {
              if (err) return cb(err);
              if (returnedSparkVariableData.result != variableData) {
                return cb(new Error("variable was set but did not return the same value"));
              }
              winston.info('variable set on device', {
                variable: variable,
                data: variableData,
                user: device._uid._id.toString(),
                device: device._id.toString()
              });
              cb();
            });
          });
        }, cb);
      });

    }, done);
  });

}