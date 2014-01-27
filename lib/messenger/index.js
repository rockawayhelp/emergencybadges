var twilio = require('twilio')(process.env.TWILIO_ACCOUNT_ID, process.env.TWILIO_AUTH_TOKEN);
var phoneNumber = process.env.TWILIO_PHONE_NUMBER;

module.exports = {
  send: function (number, message) {
    twilio.sms.messages.create({
      body: message,
      to: number,
      from: phoneNumber
    }, function(err, message) {
      process.stdout.write(message.sid);
    });
  },
  fail: function (number) {
    twilio.sms.messages.create({
      body: 'An error has occured. We\'re looking into it. Please try again later.',
      to: number,
      from: phoneNumber
    }, function(err, message) {
      process.stdout.write(message.sid);
    });
  }
}