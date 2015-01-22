var queues = require('./queues');
var _ = require('lodash');

var Job = (function() {

  function Job(name, data) {
    this.name = name;
    this.data = data;
  }

  Job.prototype.save = function(cb) {
    if (!queues[this.name]) return cb(new Error("no such job by that name"));
    queues[this.name].add(this.data, {
      timeout: 60000 // 60 seconds
    }).then(function() {
      cb()
    }).error(function(e) {
      cb(e);
    });
  }

  return Job;

})();

var Consumer = (function() {

  function Consumer() {}

  Consumer.prototype.create = function(name, data) {
    return new Job(name, data);
  }

  return Consumer;

})()

module.exports = new Consumer();