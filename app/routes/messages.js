var User = require('../lib/users');

module.exports = function (server) {
  
  server.post('/messages', function (req, res, next) {
    var phoneNumber = req.params.From;
    var message = req.params.Body;
    var responseMessage = '';
    
    User.findOrCreate(phoneNumber, function (err, user) {

      if (err) res.send(500, err);

      if (user.status === 'initial') {
        responseMessage = 'Hello, new friend.';
      } else {
        responseMessage = 'Welcome back, old friend.';
      }

      user.message(responseMessage, function () {
        res.send(200, { from: phoneNumber, user: user, response: responseMessage });
      });

    });
  });
  
};