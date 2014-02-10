var messenger = require('../lib/messenger');
var database = require('../lib/database');

module.exports = function (server) {
  
  server.post('/messages', function (req, res, next) {
    var phoneNumber = req.params.From;
    var message = req.params.Body;
    
    // TODO: Implement
    messenger.send(phoneNumber, message);
  });
  
};