if (process.env.NODE_ENV === 'development') require('../test');

var restify = require('restify');
var applyRoutes = require('./routes');

var server = restify.createServer({
  name: 'emergencybadges',
  version: '0.0.1'
});

server.pre(restify.pre.sanitizePath());
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.authorizationParser());

applyRoutes(server);

module.exports = server;

if (!module.parent) {
  server.listen(process.env.PORT || 8080, function () {
    console.log('%s listening at %s', server.name, server.url);
  });
}