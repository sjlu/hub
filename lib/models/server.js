var mongoose = require('../mongoose');
var mongooseValidator = require('mongoose-validator');
var _ = require('lodash');
var jobs = require('../jobs');

var Server = new mongoose.Schema({
  _uid: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    require: true
  },
  name: {
    type: String,
    require: true
  },
  couchpotato_url: {
    type: String,
    require: true
  },
  couchpotato_username: {
    type: String,
  },
  couchpotato_password: {
    type: String
  },
  couchpotato_api_key: {
    type: String
  },
  movies: [{
    _id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Movie',
      require: true
    },
    status: {
      type: String,
      require: true
    }
  }],
  users: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User'
  }]
});

Server.pre('save', function(next) {
  if (this.users.indexOf(this._uid) == -1) {
    this.users.push(this._uid);
  }

  next();
});

Server.methods.addUser = function(user) {

  if (this.users.indexOf(user._id) == -1) {
    this.users.push(user._id);
  }

}

Server.methods.updateBy = function(fields, cb) {
  var server = this;

  fields = _.pick(fields,
    "name",
    "couchpotato_url",
    "couchpotato_api_key",
    "couchpotato_username",
    "couchpotato_password"
  );

  _.each(fields, function(v, f) {
    server[f] = v;
  });

  server.save(cb);
}

Server.methods.setMovie = function(movie, status, cb) {

  var movieRef;
  for (var i = 0; i < this.movies; i++) {
    if (movie._id.equals(this.movies[i]._id)) {
      var prevStatus = this.movies[i].status;
      this.movies[i].status = status;
      if (prevStatus !== status && status === 'done') {
        return jobs.create('notifyUsersOfCompletedMovie', {
          server_id: this._id,
          movie_id: movie._id
        }).save(cb);
      }
      return cb();
    }
  }

  var movieRef = {
    _id: movie._id,
    status: status
  };
  this.movies.push(movieRef);
  return cb();

}

Server.method('toJSON', function() {
  var data = this.toObject({virtuals: true});
  delete data.couchpotato_username;
  delete data.couchpotato_password;
  delete data.couchpotato_api_key;
  return data;
});

module.exports = mongoose.model('Server', Server);