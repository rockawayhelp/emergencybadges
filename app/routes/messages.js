var User = require('../lib/users');
var tasks = require('../lib/tasks');
var _ = require('lodash');

module.exports = function (server) {
  
  server.post('/messages', function (req, res, next) {
    var phoneNumber = req.params.From;
    var message = req.params.Body;
    var responseMessage = '';
    
    // TODO: Remove this when moving out of beta.
    console.log('Received: "' + message + '" from ' + phoneNumber);
    
    User.findOrCreate(phoneNumber, function (err, user) {
      
      if (err) { res.send(500, err); console.log(err); return; };
      
      if (message.toUpperCase() === "RESTART") {
        user.set('status', null, function (err) {
          user.message('Resetting...');
          user.destroy(function (err, doc) {
            res.send(200, doc);
          });
        });
        return;
      }
      
      // TODO: This is a just a WIP while we get the general flow down.
      if (!user.status) {
        user.set('status', 'waitingOnZipCode', function (err, doc) {
          if (err) { console.log(err), res.send(500, err); return; };
          user.message('Welcome. What zip code are you in?');
          res.write('Welcome. What zip code are you in?');
        });
        res.send(200, user);
        return;
      }
      
      if (user.status === 'waitingOnZipCode') {
        var zip = message.match(/\d{5}/) && message.match(/\d{5}/)[0];
        
        if (zip) {
          tasks.getResourcesByZip(zip, function (err, resources) {
            if (err) console.log(err);
            user.set({ zip: zip, resourcesRequested: resources, status: 'waitingOnResources' }, function (err) {
              if (err) console.log(err);
              user.message('Okay, the following resources are needed in ' + user.zip + ': ' + resources.join(', ') + '.');
            });
          });
        } else {
          user.message('That doesn\'t seem to be a valid zip code. Please try again.')
        }
        
        res.send(200, { from: phoneNumber, user: user }); 
        return;
      }
      
      if (user.status === 'waitingOnResources') {
        var resource = message.toUpperCase().trim();
        
        if (_.contains(user.resourcesRequested, resource)) {
          tasks.getByZipAndResource(user.zip, resource, function (err, tasks) {
            
            var template = _.template('<%= _id %>: <%= description %> (@ <%= address %>)');
            
            user.set({ status: 'taskSelection', resource: resource, tasks: tasks }, function (err, doc) {
              user.message('The following tasks are available:')
              user.tasks.forEach(function (task) {
                user.message(task.description);
              });
            });
            
          });
          
        } else {
          user.message('That\'s not something we\'re looking for. Please try again.');
        }
        
        res.send(200, user); 
        return;
      }
      
      if (user.status === 'taskSelection') {
        user.message('Task selection');
        res.send(200, _.extend(user, {message: 'Task selection'}));
        return;
      }

    });
  });
  
};