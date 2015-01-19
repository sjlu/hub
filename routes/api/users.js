var express = require('express');
var router = express.Router();
var models = require('../../lib/models');
var middlewares = require('../../lib/middlewares');

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

module.exports = router;