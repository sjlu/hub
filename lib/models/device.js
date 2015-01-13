var mongoose = require('../mongoose');
var uid = require('uid');

var Device = new mongoose.Schema({
  _uid: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User'
  },
  device_id: {
    type: String,
    required: true,
    unique: true
  },
  device_key: {
    type: String,
    select: false
  },
  firmware: {
    type: String
  }
});

module.exports = mongoose.model('Device', Device);