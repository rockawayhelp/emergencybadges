var restify = require('restify');
var applyMessageRoutes = require('./routes/messages');

var server = restify.createServer();

server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.authorizationParser());

server.get('/', function (req, res, next) {
  res.send(200, {status: 'ok'});
});

applyMessageRoutes(server);

server.listen(process.env.PORT || '3000', function() {
  console.log('%s listening at %s', server.name, server.url);
});