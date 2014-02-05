var db = require('../lib/database');

module.exports = function (server) {
  
  server.get('/tasks', function (req, res, next) {
    db.view('tasks/all', function (err, rows) {
      var tasks = [];
      
      if (err) {
        res.send(500, err);
        return;
      }
      
      rows.forEach(function (task) {
        tasks.push(task);
      });
      
      res.send(200, tasks);
      
    });
  });
  
};