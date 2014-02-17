var _ = require('lodash');

if (process.env.NODE_ENV === 'production') {
  
  var twilio = require('twilio')(process.env.TWILIO_ACCOUNT_ID, process.env.TWILIO_AUTH_TOKEN);
  var phoneNumber = process.env.TWILIO_PHONE_NUMBER;

  module.exports = {
    send: function () {
      var args = Array.prototype.slice.call(arguments);
      var number = args.shift();
      var messages = args;
      messages.forEach(function (body) {
        twilio.sms.messages.create({
          body: body,
          to: number,
          from: phoneNumber
        }, function(err, message) {
          if (err) console.log(err);
          console.log('Sent:', message.sid, number, message);
        });
      });
    }
  };
  
} else {
  
  module.exports = {
    send: function (number, message) {
      console.log('SMS:', message);
    }
  };
  
}