var models = require('../../lib/models');

module.exports = function(id, data, cb) {

  var eventName = 'in_bed';
  if (data == "false") {
    eventName = 'out_of_bed';
  }

  models.Device.findOne({
    spark_id: id
  }).exec(function(err, device) {
    if (err) return cb(err);
    device.createEvent(eventName, cb);
  });

}