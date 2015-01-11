var models = require('./models');

module.exports.authenticate = function(username, password, cb) {
  var findBy = {};
  if (username.indexOf('@') > -1) {
    findBy.email = username;
  } else {
    findBy.username = username;
  }

  models.User.findOne(findBy, function(err, user) {
    if (err) return next(err);
    if (!user) {
      return cb();
    }
    user.authenticate(password, function(err, match) {
      if (err) return next(err);
      if (!match) {
        return cb();
      }
      cb(null, user._id);
    });
  });
}

module.exports.createToken = function(uid, cb) {
  models.Token({
    _uid: uid,
  }).save(function(err, token) {
    if (err) return cb(err);
    cb(null, token.token);
  });
}