var messenger = require('../lib/messenger');
var database = require('../lib/database');

module.exports = function (server) {
  
  server.post('/messages', function (req, res, next) {
    var phoneNumber = req.params.From;
    var message = req.params.Body;
  
    if (message.toLowerCase() === 'flush') {
      database.flushall(function () {
        messenger.send(phoneNumber, 'The database has been flushed.');
      });
      res.send(200);
      return;
    }
  
    database.get(phoneNumber, function(err, user) {
      if (err) {
        messenger.fail(phoneNumber);
        res.send(500);
      }
      if (user) {
        messenger.send(phoneNumber, 'Hello, old friend. (' + user + ')' );
      } else {
        database.set(phoneNumber, 'initial', function () {
          messenger.send(phoneNumber, 'Nice to meet you.');
        });
      }
    });
  
    res.send(200, {status: 'ok'});
  });
  
};