var applyMessageRoutes = require('./messages');
var applyTaskRoutes = require('./tasks');

module.exports = function (server) {
  
  server.get('/', function (req, res, next) {
    var body = '<!DOCTYPE html> <form action="/messages" method="post"> <input type="hidden" name="From" value="+2015551212"> <input type="hidden" name="To" value="+2015551212"> <input name="Body" placeholder="Message"> <input type="submit" value="Send SMS"> </form>';
    
    res.writeHead(200, {
      'Content-Length': Buffer.byteLength(body),
      'Content-Type': 'text/html'
    });
    res.write(body);
    res.end();
    
    next();
  });
  
  applyMessageRoutes(server);
  applyTaskRoutes(server);
  
};