var spark = require('spark');
var config = require('./config');

spark.login({
  accessToken: config.SPARK_CLOUD_KEY
});

module.exports = spark;