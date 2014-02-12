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
User.prototype.message = function () {
  var res, message, callback;
  
  if (_.isObject(arguments[0])) { res = arguments[0]; }
  if (_.isString(arguments[0]) || _.isArray(arguments[0])) { message = arguments[0]; }
  if (!message && (_.isString(arguments[1]) || _.isArray(arguments[1]))) { message = arguments[1]; }
  if (_.isFunction(arguments[1])) { callback = arguments[1]; }
  if (!callback && _.isFunction(arguments[2])) { callback = arguments[2]; }
  
  if (_.isArray(message)) {
    message.forEach(function (m) {
      messenger.send(this._id, m);
    })
  } else {
    messenger.send(this._id, message);
  }
  
  if (res) { res.send(200, { user: this, message: message }); }
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