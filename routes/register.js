var express = require('express');
var router = express.Router();
var models = require('../lib/models');
var validator = require('validator');
var middlewares = require('../lib/middlewares');
var async = require('async');

router.use(middlewares.auth.redirectToClientIfLoggedIn);

/* GET home page. */
router.get('/', function(req, res) {
  res.render('register', {
    username: req.query.username,
    email: req.query.email
  });
});

router.post('/', function(req, res, next) {
  var error = false;

  var email = req.body.email;
  if (!validator.isEmail(email)) {
    req.flash('error', 'Not a valid email address.');
    error = true;
  };

  var username = req.body.username;
  if (!username.length) {
    req.flash('error', 'A valid username is required.');
    error = true;
  }

  var password = req.body.password;
  if (password.length < 7) {
    req.flash('error', 'Password must be longer than 7 characters.');
    error = true;
  }

  if (!validator.equals(req.body.password, req.body.confirm_password)) {
    req.flash('error', 'Passwords are not the same.');
    error = true;
  }

  if (error) {
    return res.redirect('/register?email='+email+"&username="+username);
  }

  var user = new models.User({
    email: email,
    username: username,
    password: password
  });

  async.parallel({
    user: function(cb) {
      user.save(cb);
    }
  }, function(err, data) {
    if (err) return next(err);

    req.session.uid = data.user._id;
    res.redirect('/client');
  });
});

module.exports = router;