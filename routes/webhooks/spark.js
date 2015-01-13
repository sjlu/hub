var express = require('express');
var router = express.Router();
var spark = require('../../lib/spark');

router.post('/spark', function(req, res, next) {
  console.log(req.body);
});

module.exports = router;