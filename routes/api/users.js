var express = require('express');
var router = express.Router();
var models = require('../../lib/models');
var middlewares = require('../../lib/middlewares');
var jobs = require('../../lib/jobs');

router.use(middlewares.auth.requiresUser);

router.get('/me', function(req, res, next) {
  res.json(req.user);
});

router.put('/me', function(req, res, next) {
  req.user.updateInfo(req.body, function(err, user) {
    if (err) return next(err);
    res.json(user);
  });
});

router.put('/me/timezone', function(req, res, next) {

  if (!req.body.timezone) {
    return res.json(400, {"error": "timezone is required"});
  }

  if (req.body.timezone > 12 || req.body.timezone < -12) {
    return res.json(400, {"error": "timezone must be from -12 < x < 12"});
  }

  req.user.timezone = req.body.timezone;

  req.user.save(function(err, user) {
    if (err) return next(err);
    jobs.create("sync_devices", {
      user_id: user._id
    }).save(function(err) {
      if (err) return next(err);
      res.json(user);
    });
  });

});

router.put('/me/alarm', function(req, res, next) {

  req.user.alarm = req.body.alarm;

  req.user.save(function(err, user) {
    if (err) return next(err);
    jobs.create("sync_devices", {
      user_id: user._id
    }).save(function(err) {
      if (err) return next(err);
      res.json(user);
    });
  });

});

module.exports = router;