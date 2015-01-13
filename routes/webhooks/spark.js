var express = require('express');
var router = express.Router();
var spark = require('../../lib/spark');
var plugs = require('../../plugs');
var winston = require('../../lib/winston');

router.post(/^\/(,+)/, function(req, res, next) {
  var evt = req.params[0];
  var coreId = req.body.coreid;
  var data = req.body.data;
  var obj = {
    evt: evt,
    coreId: coreId,
    data: data
  }

  evt = evt.replace("/"+coreId, "");

  if (!plugs.map[evt]) {
    winston.warn('event was received but unhandled', obj);
    return res.send();
  }

  plugs.map[evt](coreId, data, function(err) {
    if (err) return next(err);
    winston.info('event received', obj);
    res.send();
  });
});

module.exports = router;