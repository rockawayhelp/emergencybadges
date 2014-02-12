var restify = require('restify');

var applyMessageRoutes = require('./messages');
var applyTaskRoutes = require('./tasks');

module.exports = function (server) {
  
  server.get(/\/www\/?.*/, restify.serveStatic({
    default: 'index.html',
    directory: './app/public'
  }));
  
  server.get('/', function (req, res, next) {
    res.send(200, { name: 'emergencybadges', status: 'ok' });
  });
  
  applyMessageRoutes(server);
  applyTaskRoutes(server);
  
};