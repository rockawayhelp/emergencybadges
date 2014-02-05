var db = require('../app/lib/database');
var tasks = require('./tasks');

db.setup(function () {
  tasks.forEach(function (task) {
    db.save(task, function (err, res) {
      if (err) console.error(err);
      console.log(res);
    });
  });
  db.updateDesignDocuments();
});