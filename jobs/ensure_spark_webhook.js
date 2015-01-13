var spark = require('../lib/spark');
var winston = require('../lib/winston');
var config = require('../lib/config');
var url = require('url');
var _ = require('lodash');
var request = require('request');
var plugs = require('../plugs');
var async = require('async');

var webhookUrl = url.resolve(config.BASE_URL, '/webhooks/spark');

function createWebhook(event, url, cb) {
  request({
    uri: 'https://api.spark.io/v1/webhooks',
    method: 'POST',
    form: {
      event: event,
      url: url,
      access_token: config.SPARK_CLOUD_KEY,
      mydevices: true
    }
  }, cb);
}

module.exports = function(job, done) {

  winston.info('ensuring that the spark webhook is installed');
  spark.listWebhooks(function(err, hooks) {
    if (err) return done(err);

    winston.info('hooks that are already installed', hooks);

    async.each(_.keys(plugs.map), function(evt, cb) {
      if (err) return cb(err);

      var eventHookUrl = webhookUrl+"/"+evt;

      for (var i = 0; i < hooks.length; i++) {
        if (hooks[i].url === eventHookUrl && hooks[i].event === evt) {
          winston.info('hook already installed, skipping');
          return cb();
        }
      }

      winston.info('hook not found, installing');

      // workaround until this pull request
      // is merged in and released
      // https://github.com/spark/sparkjs/pull/43
      // spark.createWebhook(null, eventHookUrl, 'mine', function(err) {
      if (err) return cb(err);
      createWebhook(evt, eventHookUrl, plugs[evt]);
      winston.info('webhook installed', {url: eventHookUrl, evt: evt});
      return cb();
    }, done);
  })

}