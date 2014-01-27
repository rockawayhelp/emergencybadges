var url = require('url');
var redis = require('redis');

if (process.env.REDISTOGO_URL) {
  var rtg   = url.parse(process.env.REDISTOGO_URL);
  var client = redis.createClient(rtg.port, rtg.hostname);
  client.auth(rtg.auth.split(":")[1]);
} else {
  var client = redis.createClient();
}

module.exports = client;