const { find: findUser } = require('../repositories/users')
const { generateHash } = require('../util/security')

module.exports.login = async function (userId, password) {
  let user = await findUser(userId)
  let hash = generateHash(password, user.salt)
  if (user.hash === hash) {
    return userId
  }
  // Take the errors to a error management module
  throw new Error("Wrong credentials")
}
