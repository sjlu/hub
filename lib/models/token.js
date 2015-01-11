var mongoose = require('../mongoose');
var uid = require('uid');

var Token = new mongoose.Schema({
  _uid: {
    type: String,
  },
  token: {
    type: String,
    require: true,
    index: {
      unique: true
    },
    default: function() {
      return uid(24);
    }
  }
});

module.exports = mongoose.model('Token', Token);