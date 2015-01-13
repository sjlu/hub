var spark = require('../lib/spark');
var winston = require('../lib/winston');
var config = require('../lib/config');
var path = require('path');
var _ = require('lodash');


module.exports = function(job, done) {

  var url = path.join(config.BASE_URL, '/webhooks/spark');

  winston.info('ensuring that the spark webhook is installed');
  spark.listWebhooks(function(err, hooks) {
    if (err) return done(err);
    winston.info('hooks that are already installed', hooks);

    if (_.contains(hooks, url)) {
      winston.info('hook already installed, skipping');
      return done();
    } else {
      winston.info('hook not found, installing');
      spark.createWebhook(null, url, 'mine', function(err) {
        if (err) return done(err);
        winston.info('webhook installed');
        return done();
      })
    }
  })

}