var $ = require('jquery');
var _ = require('lodash');

$('#phone-number').attr('value', function () {
  var randomNumber = Math.ceil(Math.random() * 10000);
  return 'demo-user' + randomNumber;
});

$('#clear').on('click', function (e) {
  e.preventDefault();
  $('#log').empty();
});

$('#messenger').submit(function (event) {

  event.preventDefault();

  var $from = $('#phone-number');
  var $message = $('#message');
  var $log = $('#log');

  var message = {
    From: $from.val(),
    Body: $message.val()
  };

  $('<li>').html('<strong>You said</strong>: ' + $message.val()).appendTo($log);
  $message.val('');

  $.post('/messages', message, function(response) {
    response.messages.forEach(function (resp) {
      $('<li>').html('<strong>Your phone replied</strong>: ' + JSON.stringify(resp)).appendTo($log);
    });
  
  }, 'json');

});