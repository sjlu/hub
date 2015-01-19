var models = require('../lib/models');
var async = require('async');
var jobs = require('../lib/jobs');

module.exports = function(job, done) {

  var type = job.data.type;
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

      jobs.create('run_spark_function', {
        device_id: device._id,
        function_name: 'set_' + type,
        variable_name: type,
        data: data.user[type]
      }).save(cb)

    }, done);

  })

}