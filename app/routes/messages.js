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
      
      // TODO: This is a just a WIP while we get the general flow down.
      if (user.status === 'initial') {
        user.message('Welcome. What zip code are you in?', function () {
          user.status = 'waitingOnZipCode';
          user.save();
        });
      }
      
      if (user.status === 'waitingOnZipCode') {
        if (message.match(/\d{5}/)) {
          user.zip = message.match(/\d{5}/)[0];
          tasks.getByZip(user.zip, function (err, tasks) {
            if (err) { user.message('There was an error'); console.log(err); return; }
            user.message('Okay, we have you at ' + user.zip + '. We need the following resources. Do you have:');
            user.resourcesRequested = _(tasks).map(function (task) { return task.resources; }).union();
            user.status = 'waitingOnResource';
            user.save(function (err) {
              user.message(user.resourcesRequested.join(', '));
            });
          });
        } else {
          user.message('That doesn\'t appear to be a valid zip code.')
        }
      }
      
      res.send(200, { from: phoneNumber, user: user });

    });
  });
  
};