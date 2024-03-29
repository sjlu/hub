var _ = require('lodash');
var winston = require('./winston');

module.exports.create = function(name, data) {
  var queue = require('./queues')[name];
  return {
    save: function(cb) {
      if (!queue) {
        return cb(new Error("no such job: " + name));
      }
      queue.add(data, {
        timeout: 60000 // 60 seconds
      }).then(function() {
        winston.info('job created', {
          name: name,
          data: data
        });
        cb();
      }).error(function(e) {
        cb(e);
      });
    }
  }
}