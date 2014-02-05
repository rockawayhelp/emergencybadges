var tasks = require('../lib/tasks');

module.exports = function (server) {
  
  server.get('/tasks', function (req, res, next) {
    tasks.getAll(function (err, tasks) {
      if (err) res.send(500, err);
      res.send(200, tasks);
    });
  });
  
};