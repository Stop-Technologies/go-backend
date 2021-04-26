const crypto = require('crypto');

let generateRandomString = function(length) {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
};

let generateHash = function(password, salt) {
  return crypto
    .createHash('SHA256')
    .update(password + salt)
    .digest('hex');
};

let generateSecurityCredentials = function(password, saltLength) {
  let salt = generateRandomString(saltLength);
  let hash = generateHash(password, salt);
  return {
    hash,
    salt
  };
};

module.exports = {
  generateSecurityCredentials,
  generateHash
};