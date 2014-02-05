exports.test = require('tap').test;

['TWILIO_ACCOUNT_SID',
 'TWILIO_AUTH_TOKEN',
 'TWILIO_PHONE_NUMBER'].forEach(function(name) {
  if (!process.env[name]) process.env[name] = 'FAKE_' + name;
});
