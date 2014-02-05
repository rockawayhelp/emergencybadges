var db = require('../');
var tasks = require('./tasks');
var destroy = require('./destroy');

destroy(function () {
  db.setup(function () {
    tasks.forEach(function (task) {
      db.save(task, function (err, res) {
        if (err) console.error(err);
        console.log(res);
      });
    });
    db.updateDesignDocuments();
  });
});