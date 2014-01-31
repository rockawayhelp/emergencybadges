var cradle = require('cradle');

var couchLocation = process.env.EMERGENCY_BADGES_COUCHDB_URL;
var couch = new(cradle.Connection)(couch, 5984, {
  cache: true,
  raw: false
});

var db = couch.database('emergencybadges');

db.exists(function (err, exists) {
  if (err) {
    console.log('error', err);
  } else if (exists) {
    console.log('Database exists.');
  } else {
    console.log('Database does not exist. Creating.');
    db.create();
    /* populate design documents */
  }
});

module.exports = db;