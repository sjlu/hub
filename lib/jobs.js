var queues = require('./queues');
var _ = require('lodash');

module.exports.create = function(name, data) {
  return {
    save: function(cb) {
      if (!queues[name]) {
        console.log(queues);
        console.log(require('./queues'));
        return cb(new Error("no such job: " + name));
      }
      queues[name].add(data, {
        timeout: 60000 // 60 seconds
      }).then(function() {
        cb()
      }).error(function(e) {
        cb(e);
      });
    }
  }
}