var sparkProtocol = require("spark-protocol");
var DeviceServer = sparkProtocol.DeviceServer;
var config = require('./config');

module.exports = new DeviceServer({
  coreKeysDir: config.SPARK_DEVICES_PATH
});