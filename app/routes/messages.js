var User = require('../lib/models/users');
var tasks = require('../lib/models/tasks');
var _ = require('lodash');

module.exports = function (server) {
  
  server.post('/messages', function (req, res, next) {
    var phoneNumber = req.params.From;
    var message = req.params.Body;
    
    User.findOrCreate(phoneNumber, function (err, user) {
      if (err) { res.send(500, err); return; }
      user.respondToMessage(message, res);
    });
  });
  
};