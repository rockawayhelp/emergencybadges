var User = require('../lib/users');

module.exports = function (server) {
  
  server.post('/messages', function (req, res, next) {
    var phoneNumber = req.params.From;
    var message = req.params.Body;
    var responseMessage = '';
    
    console.log('Received');
    
    User.findOrCreate(phoneNumber, function (err, user) {
      
      if (err) { res.send(500, err), process.stdout.write(err) };

      responseMessage = user.status === 'Hello, new friend.' : 'Welcome back, old friend.';

      user.message(responseMessage, function () {
        console.log('Message (theoretically) sent.');
        res.send(200, { from: phoneNumber, user: user, response: responseMessage });
      });

    });
  });
  
};