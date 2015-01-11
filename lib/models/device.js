var mongoose = require('../mongoose');
var uid = require('uid');

var Device = new mongoose.Schema({
  _uid: {
    type: String
  },
  device_id: {
    type: String,
    require: true,
    unique: true
  },
  device_key: {
    type: String,
    require: true
  }
});

module.exports = mongoose.model('Device', Device);