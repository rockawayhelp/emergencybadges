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
      
      if (message.toUpperCase() === "RESTART") {
        user.set('status', null, function (err) {
          user.message('Resetting...');
          user.destroy();
        });
        return;
      }
      
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
        
        if (user.resourcesRequested.indexOf(resource) !== 1) {
          user.set({ resource: resource, status: 'taskSelection' }, function (err) {
            console.log(err);
            tasks.getByZipAndResource(user.zip, user.resource, function (err, tasks) {
              console.log(err, tasks);
              var taskTemplate = _.template('<%= id %>: <%= description %> (@ <%= address %>)');
              tasks = tasks
                .map(function (task) { return task.value; })
                .forEach(function (task) { user.message(taskTemplate(task)); } );
              console.log(tasks);
            });
          });
        } else {
          user.message('That doesn\'t seem to be a valid choice. Please select one of the following: ' + resources.join(', ') + '.');
        }
        
        res.send(200, { from: phoneNumber, user: user }); 
        return;
      }

    });
  });
  
};