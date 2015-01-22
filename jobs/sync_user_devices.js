var models = require('../lib/models');
var async = require('async');
var jobs = require('../lib/jobs');
var firmware = require('../lib/firmware');
var winston = require('../lib/winston');
var _ = require('lodash');

module.exports = function(job, done) {

  var userId = job.data.user_id;

  async.parallel({
    user: function(cb) {
      models.User.findById(userId).exec(cb);
    },
    devices: function(cb) {
      models.Device.find({
        _uid: userId
      }).exec(cb);
    }
  }, function(err, data) {
    if (err) return done(err);

    async.each(data.devices, function(device, cb) {
      device.getSparkDevice(function(err, sparkDevice) {
        if (err) return cb(err);
        async.each(_.keys(sparkDevice.variables), function(variable, cb) {
          if (sparkDevice.functions.indexOf("set_" + variable) < 0) {
            console.log(sparkDevice);
            return cb();
          }

          var variableData;
          if (device[variable]) {
            variableData = device[variable];
          } else if (data.user[variable]) {
            variableData = data.user[variable];
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
                user: data.user._id.toString(),
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