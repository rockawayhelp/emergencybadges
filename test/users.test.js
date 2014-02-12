var test = require('./').test;
var User = require('../app/lib/users');

test('User should exist', function (t) {
  t.ok(User, 'User exists');
  t.end();
});

test('User instance should have a #save method', function (t) {
  var user = new User();
  t.ok(user.save, 'Method exists');
  t.type(user.save, 'function', 'Property is a method');
  t.end();
});

test('User instance should have a #message method', function (t) {
  var user = new User();
  t.ok(user.message, 'Method exists');
  t.type(user.message, 'function', 'Property is a method');
  t.end();
});

test('New user instances should have a type property of "user"', function (t) {
  var user = new User();
  t.ok(user.type, 'Property exists');
  t.equal(user.type, 'user', 'Property is "user"');
  t.end();
});

test('New user instances should have a status property of "initial"', function (t) {
  var user = new User();
  t.ok(user.type, 'Property exists');
  t.equal(user.type, 'user', 'Property is "user"');
  t.end();
});

test('User should have a #find method', function (t) {
  t.ok(User.find, 'Method exists');
  t.type(User.find, 'function', 'Property is a method');
  t.end();
});

test('User should not find records that don\'t exist', function (t) {
  User.find('impossible-user-id', function (err, user) {
    t.ok(err, 'There should be an error');
    t.ok(err.error, 'Error should have an error property');
    t.equal(err.error, 'not_found', 'The error should be "not_found"');
    t.ok(err.reason, 'Error should have a reason property');
    t.equal(err.reason, 'missing', 'The reason should be "missing"');
    t.end();
  });
});

// test('User should have a #findOrCreate method', function (t) {
//   t.ok(User.findOrCreate, 'Method exists');
//   t.type(User.findOrCreate, 'function', 'Property is a method');
//   t.end();
// });