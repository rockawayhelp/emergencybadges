var tasks = require('../lib/models/tasks');

module.exports = function (server) {
  
  server.get('/tasks', function (req, res, next) {
    var zip = req.params.zip;
    var resource = req.params.resource;
    var callback = function (err, tasks) {
      if (err) res.send(500, err);
      res.send(200, tasks);
    };
    
    if (resource) resource = resource.toUpperCase();
    
    if (zip && resource ) {
      tasks.getByZipAndResource(zip, resource, callback);
    } else if (req.params.zip) {
      tasks.getByZip(zip, callback);
    } else if (resource) {
      tasks.getByResource(resource, callback);
    } else {
      tasks.getAll(callback);
    }
  });
  
};