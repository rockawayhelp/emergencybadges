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
      
      if (message.trim().toUpperCase() === 'RESET') {
        var reply = 'Resetting...';
        user.message(reply);
        user.destroy(function () {
          res.send(200, { message: reply });
        });
      } else {
        switch (user.status) {
        case 'waitingOnZipCode':
          var zip = message.match(/\d{5}/) && message.match(/\d{5}/)[0];
          if (zip) {
            tasks.getResourcesByZip(zip, function (err, resources) {
              if (err) console.log(err);
              user.set({ zip: zip, resourcesRequested: resources, status: 'waitingOnResources' }, function (err) {
                if (err) console.log(err);
                var reply = 'Okay, the following resources are needed in ' + user.zip + ': ' + resources.join(', ') + '.';
                user.message(reply);
                res.send({ message: reply });
              });
            });
          } else {
            var reply = 'That doesn\'t seem to be a valid zip code. Please try again.';
            user.message(reply);
            res.send({ message: reply });
          }
          break;
        case 'waitingOnResources':
          var resource = message.toUpperCase().trim();
          if (_.contains(user.resourcesRequested, resource)) {
            tasks.getByZipAndResource(user.zip, resource, function (err, tasks) {
              var template = _.template('<%= _id %>: <%= description %> (@ <%= address %>)');
              user.set({ status: 'taskSelection', resource: resource, tasks: tasks }, function (err, doc) {
                var replies = ['The following tasks are available:'];
                user.tasks.forEach(function (task) {
                  replies.push(task._id + ': ' + task.description + '(@ ' + task.location + ')');
                });
                replies.forEach(function (reply) {
                  user.message(reply);
                });
                replies.push('Select a number to take on a task.');
                res.send(200, { message: replies });
              });
            });
          } else {
            var reply = 'That\'s not something we\'re looking for. Please try again.';
            user.message(reply);
            res.send(200, { message: reply });
          }
          break;
        case 'taskSelection':
          user.message('Task selection');
          res.send(200, _.extend(user, {message: 'Task selection'}));
          break;
        default:
          user.set('status', 'waitingOnZipCode', function (err, doc) {
            if (err) { console.log(err), res.send(500, err); return; };
            var reply = 'Welcome. What zip code are you in?';
            user.message(reply);
            res.send(200, { message: reply });
          });
          break;
        }
      }

    });
  });
  
};