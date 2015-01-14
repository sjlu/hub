var mongoose = require('../mongoose');
var uid = require('uid');
var firmware = require('../firmware');
var spark = require('../spark');

var Device = new mongoose.Schema({
  _uid: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User'
  },
  spark_id: {
    type: String,
    required: true,
    unique: true
  },
  device_key: {
    type: String,
    select: false
  },
  firmware_name: {
    type: String
  },
  firmware_version: {
    type: String
  }
});

Device.methods.isFirmwareCurrent = function(cb) {
  var self = this;

  firmware.list(function(err, list) {
    if (err) return cb(err);
    if (self.firmware_name && list[self.firmware_name]) {
      if (list[self.firmware_name].version === self.firmware_version) {
        return cb(null, true);
      }
    }
    return cb(null, false);
  });
}

Device.methods.getSparkDevice = function(cb) {
  var self = this;
  spark.getDevice(self.spark_id, cb);
}

module.exports = mongoose.model('Device', Device);