var mongoose = require('../mongoose');
var uid = require('uid');
var firmware = require('../firmware');
var spark = require('../spark');
var models = require('../models')

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
  },
  connected: {
    type: Boolean,
    default: false
  },
  last_seen: {
    type: Date,
    default: 0
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

Device.methods.updateConnectionStatus = function(connected, cb) {
  this.connected = connected;
  this.last_seen = Date.now();
  this.save(cb);
}

Device.methods.getSparkVariable = function(variable, cb) {
  var self = this;
  self.getSparkDevice(function(err, device) {
    if (err) return cb(err);
    if (!device) return cb(new Error("Spark device not found"));
    if (!device.variables || !device.variables[variable]) return cb(new Error("Variable not registered"));

    device.getVariable(variable, function(err, result) {
      if (err) return cb(err);
      return cb(null, {value:result.result});
    });
  });
}

Device.methods.createEvent = function(name, cb) {
  var self = this;
  var evt = new models.Event({
    _did: self.id,
    name: name
  });
  evt.save(cb);
}

module.exports = mongoose.model('Device', Device);