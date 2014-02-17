var _ = require('lodash');

if (process.env.NODE_ENV === 'production') {
  
  var twilio = require('twilio')(process.env.TWILIO_ACCOUNT_ID, process.env.TWILIO_AUTH_TOKEN);
  var phoneNumber = process.env.TWILIO_PHONE_NUMBER;

  module.exports = {
    send: function (number, message) {
      message.concat(message);
      messages.forEach(function (message) {
        twilio.sms.messages.create({
          body: message,
          to: number,
          from: phoneNumber
        }, function(err, response) {
          if (err) console.log(err);
          console.log('Sent:', response.sid, number, message);
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