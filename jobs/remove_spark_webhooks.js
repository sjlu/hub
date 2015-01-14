var spark = require('../lib/spark');
var winston = require('../lib/winston');
var async = require('async');
var url = require('url');
var config = require('../lib/config');

var webhookUrl = url.resolve(config.BASE_URL, '/webhooks/spark');

module.exports = function(job, done) {

  winston.info('removing all webhooks');

  spark.listWebhooks(function(err, hooks) {
    if (err) return done(err);
    async.each(hooks, function(hook, cb) {

      if (hooks.url.indexOf(webhookUrl) === 0) {
        spark.deleteWebhook(hook.id, cb);
      } else {
        cb();
      }

    }, done);
  });

}