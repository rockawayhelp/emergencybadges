var db = require('../../database');
var messenger = require('../../messenger');
var respondToMessage = require('./respond-to-message');
var _ = require('lodash');

function User(doc) {
  
  // Call the new constructor in case your forgot it.
  if (!(this instanceof User)) {
    return new User(doc);
  }
  
  // Assume that if you just get a string, that it's a phone number.
  // TODO: Validate this with some regex or something.
  if (typeof doc === 'string') doc = { _id: doc };
  
  // Extend the User model with whatever is being stored in CouchDB.
  _.extend(this, doc);
  
  // Override the document type with 'user' no matter what.
  this.type = 'user';
  
}

// CLASS METHODS

User.create = function (doc) {
  if (typeof doc === 'string') doc = { _id: doc };
  return new User(doc);
};

User.find = function (phoneNumber, callback) {
  db.get(phoneNumber, function (err, doc) {
    if (err) { callback(err); return; }
    if (doc.type && doc.type === 'user') {
      callback(null, User.create(doc));
    } else {
      var error = { error: 'invalid_type', reason: 'type is not "user"' };
      callback(error, null);
    }
  });
};

User.findOrCreate = function (phoneNumber, callback) {
  User.find(phoneNumber, function (err, doc) {
    if (!err && doc) { callback(null, doc); return; }
    if (err.error === 'not_found') {
      var user = User.create(phoneNumber);
      user.save(function () { callback(null, user); });
    } else {
      callback(err);
    }
  });
};

// INSTANCE METHODS

User.prototype.save = function (callback) {
  db.save(this._id, this, callback);
};

User.prototype.destroy = function (callback) {
  db.remove(this._id, callback);
};


// Send an SMS message with to the user's phone.
User.prototype.message = function (message, res, callback) {
  
  var number = this._id;
  
  var messages = [].concat(message);
  messages.forEach(function (m) {
    messenger.send(number, m);
  });
  
  if (res) { res.send(200, { user: this, messages: messages }); }
  if (typeof callback === 'function') callback();
};

// Set one or more properties on the object and save those changes to the
// database.
User.prototype.set = function (property, value, callback) {
  if (_.isString(property)) this[property] = value;
  
  if (_.isObject(property)) {
    callback = value;
    _.extend(this, property);
  }
  
  this.save(callback);
};

User.prototype.respondToMessage = respondToMessage;

module.exports = User;