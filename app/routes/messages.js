var User = require('../lib/users');
var tasks = require('../lib/tasks');
var _ = require('lodash');

module.exports = function (server) {
  
  server.post('/messages', function (req, res, next) {
    var phoneNumber = req.params.From;
    var message = req.params.Body;
    var responseMessage = '';
    
    // TODO: Remove this when moving out of beta.
    console.log('Received "' + message + '" from ' + phoneNumber);
    
    User.findOrCreate(phoneNumber, function (err, user) {
      
      if (err) { res.send(500, err), process.stdout.write(err) };
      
      console.log(user);
      
      // TODO: This is a just a WIP while we get the general flow down.
      if (!user.status) {
        user.setStatus('waitingOnZipCode', function (err, doc) {
          if (err) console.log(err);
          user.message('Welcome. What zip code are you in?');
        });
      }
      
      if (user.status === 'waitingOnZipCode') {
        user.message('Waiting on a zip code');
      }
      
      res.send(200, { from: phoneNumber, user: user });

    });
  });
  
};