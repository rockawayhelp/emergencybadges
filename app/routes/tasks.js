var db = require('../database');

module.exports = function (server) {
  
  server.get('/tasks', function (req, res, next) {
    db.view('tasks/all', function (err, res) {
      var tasks = [];
      
      if (err) {
        res.send(500, err);
        return;
      }
      
      res.forEach(function (task) {
        tasks.push(task);
      });
      
      res.send(200, tasks);
      
    });
  });
  
}