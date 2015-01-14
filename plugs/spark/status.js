var jobs = require('../../lib/jobs');

module.exports = function(id, data, cb) {
  if (data == 'online') {
    jobs.create('update_device_firmware', {
      spark_id: id
    }).save(cb);
  }
}