var _ = require('lodash');

module.exports.create = function(name, data) {
  var queue = require('queues')[name];
  return {
    save: function(cb) {
      if (!queue) {
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