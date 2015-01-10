var express = require('express');
var router = express.Router();
var middlewares = require('../lib/middlewares');

/* GET home page. */
router.get('/', middlewares.auth.redirectToLogin, function(req, res, next) {
  return res.render('client');
});

module.exports = router;