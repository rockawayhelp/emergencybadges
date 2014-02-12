var db = require('../');

function destroyDatabase (callback) {
  db.destroy(function (err, res) {
    if (err) console.error(err);
    callback();
  });
}

module.exports = destroyDatabase;

if (!module.parent) {
  destroyDatabase();
}