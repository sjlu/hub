var express = require('express');
var router = express.Router();
var spark = require('../../lib/spark');
var plugs = require('../../plugs');

router.post('/', function(req, res, next) {
  var evt = req.body.name;
  var coreId = req.body.coreid;
  var data = req.body.data;

  if (!plugs.map[evt]) {
    return res.send(404);
  }

  plugs.map[evt](coreId, data, function(err) {
    if (err) return next(err);
    res.send();
  });
});

module.exports = router;