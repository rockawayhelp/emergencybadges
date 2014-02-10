var cradle = require('cradle');
var applyDesignDocuments = require('./design-documents');

var couchLocation = process.env.COUCHDB || 'http://localhost';
var couch = new(cradle.Connection)(couchLocation, 5984, {
  cache: true,
  raw: false
});

var db = couch.database('emergencybadges');

db.setup = function (callback) {
  db.exists(function (err, exists) {
    if (err) {
      console.log('error', err);
    } else if (exists) {
      console.log('Database exists.');
      if (typeof callback === 'function') callback();
    } else {
      console.log('Database does not exist. Creating.');
      db.create(function (err, res) {
        if (!err) {
          applyDesignDocuments(db);
          if (typeof callback === 'function') callback();
        }
      });
    }
  });
};

db.updateDesignDocuments = function (callback) {
  applyDesignDocuments(db);
  if (typeof callback === 'function') callback();
};

db.setup();

module.exports = db;