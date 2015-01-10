var express = require('express');
var router = express.Router();
var middlewares = require('../lib/middlewares');
var models = require('../lib/models');
var validator = require('validator');
var _ = require('lodash');

/* GET home page. */
router.get('/', middlewares.auth.redirectToClientIfLoggedIn, function(req, res, next) {
  if (req.user) {
    return res.redirect('/client');
  }

  return res.redirect('login');
});

module.exports = router;