var test = require("tap").test;

test('Environment variables should be defined', function (t) {
  t.ok(process.env.EMERGENCY_BADGES_COUCHDB_URL, 'process.env.EMERGENCY_BADGES_COUCHDB_URL should be defined.');
  t.ok(process.env.EMERGENCY_BADGES_COUCHDB_USERNAME, 'process.env.EMERGENCY_BADGES_COUCHDB_USERNAME should be defined.');
  t.ok(process.env.EMERGENCY_BADGES_COUCHDB_PASSWORD, 'process.env.EMERGENCY_BADGES_COUCHDB_PASSWORD should be defined.');
  t.end();
});

