var fs = require('fs');
var config = require('./config');
var path = require('path');

module.exports.save = function(deviceId, pubKey, cb) {
  fs.writeFile(path.join(config.SPARK_DEVICES_PATH, deviceId + '.pub.pem'), pubKey, cb);
}