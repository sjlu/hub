var express = require('express');
var router = express.Router();
var middlewares = require('../lib/middlewares');

router.use(middlewares.auth.redirectToLogin);
router.use(middlewares.auth.requiresAdmin);

/* GET home page. */
router.get('/', function(req, res, next) {
  return res.render('app', {name: 'admin', user: req.user});
});

module.exports = router;