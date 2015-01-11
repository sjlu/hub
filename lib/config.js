var _ = require('lodash');
var dotenv = require('dotenv');

// load dotenv config vars if available
dotenv.load();

var config = {
  ENV: 'development',
  SESSION_SECRET: 'HGPu77vgMzhWNzsnQT',
  MONGO_URL: 'mongodb://localhost/hub',
  REDIS_URL: 'redis://localhost:6379',
  SPARK_DEVICES_PATH: './device_keys',
  SPARK_CLOUD_KEY: ''
};
config = _.defaults(process.env, config);

// tell express what environment we're in
process.env.NODE_ENV = config.ENV;

module.exports = config;