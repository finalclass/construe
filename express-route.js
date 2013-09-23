'use strict';

var fs = require('fs');

module.exports = function (req, res) {
  var eventEmitterStream = fs.createReadStream(__dirname + '/bower_components/eventEmitter/EventEmitter.js');
  var construeStream = fs.createReadStream(__dirname + '/index.js');

  res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
  res.write('\n\n\/\/EventEmitter.js file:\n');
  eventEmitterStream.pipe(res, {end: false});
  eventEmitterStream.on('end', function () {
    res.write('\n\n\/\/index.js file:\n');
    construeStream.pipe(res);
  });
};