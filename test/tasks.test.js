var test = require('./').test;
var tasks = require('../app/lib/tasks');

test('tasks.getAll() should return an array of tasks', function (t) {
  t.ok(tasks.getAll);
  tasks.getAll(function (err, tasks) {
    t.notOk(err, 'Should not return an error');
    t.equal(Object.prototype.toString.call(tasks), '[object Array]', 'Should return an array of tasks');
    t.end();
  });
});

test('Tasks should have an _id field', function (t) {
  t.ok(tasks.getAll, 'Tasks object should have a .getAll method');
  tasks.getAll(function (err, tasks) {
    var task = tasks[0];
    t.ok(task.id, 'Tasks should have an ID property');
    t.end();
  });
});