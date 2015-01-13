var fs = require('fs');
var spark = require('../lib/spark');
var path = require('path');
var _ = require('lodash');
var winston = require('../lib/winston');

var evtMap = {};

var listenForEvent = function(evt, func) {
  evtMap[evt] = func;
}

var joinPaths = function(a, b) {
  if (!a) return b;
  if (!b) return a;
  return path.join(a, b);
}

var readDir = function(dir) {

  fs.readdirSync(joinPaths(__dirname, dir)).forEach(function(file) {
    if (file.indexOf('.js') >= 0) {
      if (file === "index.js") return;
      var name = file.replace('.js', '');
      evtMap[joinPaths(dir, name)] = require(joinPaths(joinPaths(__dirname, dir), name));
    } else {
      readDir(joinPaths(dir, file));
    }
  });

}

readDir();

module.exports.start = function() {
  spark.getEventStream(null, 'mine', function(data) {
    if (!evtMap[data.name]) {
      winston.warn('no such handler', data.name)
      return;
    }

    winston.info('received event', data);
    evtMap[data.name](data.coreid, data.data, function(){});
  });
}

module.exports.map = evtMap;