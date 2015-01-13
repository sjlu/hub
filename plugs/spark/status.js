var jobs = require('../../lib/jobs');

module.exports = function(coreId, data, cb) {
  if (data == 'online') {
    jobs.create('update_device_firmware', {
      core_id: coreId
    }).save(cb);
  }
}