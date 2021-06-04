const { randomBytes, createHash } = require('crypto')

function generateRandomString (length) {
  return randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length)
}

function generateHash (password, salt) {
  return createHash('SHA256')
    .update(password + salt)
    .digest('hex')
}

function generateSecurityCredentials (password, saltLength) {
  let salt = generateRandomString(saltLength)
  let hash = generateHash(password, salt)
  return {
    hash,
    salt
  }
}

module.exports = {
  generateHash,
  generateSecurityCredentials
}