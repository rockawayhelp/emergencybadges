var applyMessageRoutes = require('./messages');
var applyTaskRoutes = require('./tasks');

module.exports = function (server) {
  
  server.get('/', function (req, res, next) {
    res.send(200, {name: 'Emergency Badges', status: 'ok'});
    next();
  });
  
  applyMessageRoutes(server);
  applyTaskRoutes(server);
  
}