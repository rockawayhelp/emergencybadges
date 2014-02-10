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
      
      if (err) { res.send(500, err); console.log(err); return; };
      
      console.log(user);
      
      // TODO: This is a just a WIP while we get the general flow down.
      if (!user.status) {
        user.set('status', 'waitingOnZipCode', function (err, doc) {
          if (err) console.log(err);
          user.message('Welcome. What zip code are you in?');
        });
        res.send(200, { from: phoneNumber, user: user }); 
        return;
      }
      
      if (user.status === 'waitingOnZipCode') {
        var zip = user.message.match(/\d{5}/) && user.message.match(/\d{5}/)[0];
        if (zip) {
          tasks.getResourcesByZip(zip, function (err, resources) {
            if (err) console.log(err);
            user.set({ zip: zip, resourcesRequested: resources, status: 'waitingOnResources' }, function () {
              user.message('Okay, the following resources are needed in ' + user.zip + ': ' + resources.join(', '));
            });
          });
        }
        res.send(200, { from: phoneNumber, user: user }); 
        return;
      }
      
      if (user.status === 'waitingOnResources') {
        user.message('Not implemented.');
        res.send(200, { from: phoneNumber, user: user }); 
        return;
      }

    });
  });
  
};