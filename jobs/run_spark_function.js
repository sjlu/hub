var models = require('../lib/models');
var winston = require('../lib/winston');

module.exports = function(job, done) {

  var funcName = job.data.function_name;
  var deviceId = job.data.device_id;
  var sparkId = job.data.spark_id;
  var params = job.data.data;
  var varName = job.data.variable_name;

  var findBy = {};
  if (deviceId) {
    findBy._id = deviceId;
  } else if (sparkId) {
    findBy.spark_id = sparkId;
  } else {
    return cb(new Error("spark_id or device_id not provided"));
  }

  models.Device.findById(deviceId, function(err, device) {
    if (err) return done(err);

    device.runSparkFunction(funcName, params, function(err) {
      if (err) return done(err);
      done();
    });
  });

}