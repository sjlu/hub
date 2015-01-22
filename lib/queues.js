var Queue = require('bull');
var URI = require('URIjs');
var jobs = require('../jobs');
var config = require('./config');
var _ = require('lodash');
var winston = require('./winston');

var redisParts = URI(config.REDIS_URL || 'redis://localhost:6379');
var redisHostname = redisParts.hostname();
var redisPort = redisParts.port();
var redisPassword = redisParts.password();

// according to "bull", queues are cheap
// and one should be created for each job.
// we also need the Queue "instance" to
// create jobs with
var queues = {};

var createQueue = function(name) {
  var opts = {};
  if (redisPassword && redisPassword.length) {
    opts.auth_pass = redisPassword;
  }

  var queue = Queue(name, redisPort, redisHostname, opts);
  queue.on('completed', function(job) {
    winston.info('job success', {
      name: name,
      data: job.data
    });
  });
  queue.on('failed', function(job, err) {
    winston.error('job failed', {
      name: name,
      data: job.data
    });
    console.error(err);
  });
  return queue;
}

_.each(jobs, function(process, name) {
  queues[name] = createQueue(name);
});

module.exports = queues;