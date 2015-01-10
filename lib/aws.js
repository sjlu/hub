var aws = require('aws');
var config = require('./config');

aws.config.update({
  accessKeyId: config.AWS_KEY,
  secretAccessKey: config.AWS_SECRET
  region: 'us-east-1'
});

module.exports = aws;