var db = require('../app/lib/database');

db.destroy(function (err, res) {
  if (err) console.error(err);
  console.log(res);
});