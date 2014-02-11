var db = require('../../database');
var _ = require('lodash');

var taskFinder = module.exports = {
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
    if (!_.isString(zip)) zip = zip.toString();
    db.view('tasks/byZipAndResource', { key: [zip, resource] }, function (err, tasks) {
      if (typeof callback === 'function') callback(err, tasks);
    });
  },
  getResourcesByZip: function (zip, callback) {
    db.view('tasks/all', { key: zip.toString() }, function (err, tasks) {
      console.log(tasks);
      var resources = _(tasks).map(function (task) {
        return task.value.resources;
      }).flatten().uniq().value();
      if (typeof callback === 'function') callback(err, resources);
    });
  }
};