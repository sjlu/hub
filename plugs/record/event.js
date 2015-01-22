var models = require('../../lib/models');

module.exports = function(id, data, cb) {

  models.Device.findOne({
    spark_id: id
  }).exec(function(err, device) {
    if (err) return cb(err);
    device.createEvent(data, cb);
  });

}