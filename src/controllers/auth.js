const { find: findUser } = require('../repositories/users')
const { generateHash } = require('../util/security')

module.exports = {
  async authenticate (userId, password) {
    let user = await findUser(userId)
    if (user) {
      let hash = generateHash(password, user.salt)
      if (user.hash === hash) {
        return user
      }
    }
    throw new Error('Wrong credentials')
  }
}
