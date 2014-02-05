var db = require('../database');

module.exports = {
  getAll: function (callback) {
    db.view('tasks/all', function (err, tasks) {
      if (typeof callback === 'function') callback(err, tasks);
    });
  }
};