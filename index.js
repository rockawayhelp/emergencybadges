var restify = require('restify');
var messenger = require('./lib/messenger');

var server = restify.createServer();

server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.authorizationParser());

server.get('/', function (req, res, next) {
  res.send(200, {status: 'ok'});
});

server.post('/messages', function (req, res, next) {
  var phoneNumber = req.params.From;
  messenger.send(phoneNumber, 'Got it.');
  res.send(200, {status: 'ok'});
});

server.listen(process.env.PORT || '3000', function() {
  console.log('%s listening at %s', server.name, server.url);
});