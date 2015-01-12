var fs = require('fs');
var async = require('async');
var _ = require('lodash');

module.exports.list = function(cb) {
  fs.readdir('./firmware', function(err, data) {
    if (err) return cb(err);
    async.map(data, function(f, cb) {
      fs.readFile('./firmware/'+f+'/package.json', 'utf8', function(err, data) {
        if (err) return cb(err);
        data = JSON.parse(data);
        cb(null, {
          name: f,
          version: data.version,
          file: './firmware/'+f+'/'+data.main
        });
      })
    }, function(err, data) {
      if (err) return cb(err);
      cb(null, _.indexBy(data, "name"));
    });
  });
}