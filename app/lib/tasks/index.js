var db = require('../database');

module.exports = {
  getAll: function (callback) {
    db.view('tasks/all', function (err, tasks) {
      if (typeof callback === 'function') callback(err, tasks);
    });
  },
  getByZip: function (zip, callback) {
    db.view('tasks/byZipCode', { key: zip.toString() }, function (err, tasks) {
      if (typeof callback === 'function') callback(err, tasks);
    });
  },
  getByResource: function (resource, callback) {
    db.view('tasks/byResource', { key: resource }, function (err, tasks) {
      if (typeof callback === 'function') callback(err, tasks);
    });
  },
  getByZipAndResource: function (zip, resource, callback) {
    db.view('tasks/byZipAndResource', { key: [zip.toString(), resource] }, function (err, tasks) {
      if (typeof callback === 'function') callback(err, tasks);
    });
  }
};