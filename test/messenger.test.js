var test = require("tap").test;
var messenger = require('../app/lib/messenger');

test('Messenger should have the methods called in the app', function (t) {
  t.type(messenger.send, 'function', 'it should have a "send" method');
  t.type(messenger.fail, 'function', 'it should have a "fail" method');
  t.end();
});