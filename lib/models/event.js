var mongoose = require('../mongoose');
var uid = require('uid');

var Event = new mongoose.Schema({
  _did: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'device',
    required: true
  },
  _uid: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'user',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Event', Event);