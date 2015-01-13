var spark = require('../lib/spark');
var winston = require('../lib/winston');
var async = require('async');

module.exports = function(job, done) {

  winston.info('removing all webhooks');

  spark.listWebhooks(function(err, hooks) {
    if (err) return done(err);
    async.each(hooks, function(hook, cb) {
      spark.deleteWebhook(hook.id, cb);
    }, done);
  });

}