var express = require('express');
var router = express.Router();
var auth = require('../../lib/auth');

/* GET home page. */
router.post('/token', function(req, res, next) {
  var username = req.body.username.toLowerCase();

  auth.authenticate(username, req.body.password, function(err, uid) {
    if (err) return next(err);
    if (!uid) {
      res.json(400, {
        "error": "Unknown username and password combination."
      });
    }
    auth.createToken(uid, function(err, token) {
      if (err) return next(err);
      res.json({
        "access_token": token
      });
    });
  });
});

module.exports = router;