var restify = require('restify');

var messenger = require('./lib/messenger');
var session = require('./lib/session');

var server = restify.createServer();

server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.authorizationParser());

server.get('/', function (req, res, next) {
  res.send(200, {status: 'ok'});
});

server.post('/messages', function (req, res, next) {
  var phoneNumber = req.params.From;
  
  session.get(phoneNumber, function(err, user) {
    if (err) messenger.send(phoneNumber, 'There was some kind of error.')
    if (user) {
      messenger.send(phoneNumber, 'Hello, old friend.');
    } else {
      session.set(phoneNumber, 'initial', function () {
        res.send(phoneNumber, 'Nice to meet you.')
      })
    }
  });
  
  res.send(200, {status: 'ok'});
});

server.listen(process.env.PORT || '3000', function() {
  console.log('%s listening at %s', server.name, server.url);
});