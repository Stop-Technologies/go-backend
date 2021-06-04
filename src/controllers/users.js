const users = require("../repositories/users")
const sec = require('../util/security')

module.exports = {
  async findAll() {
    return await users.findAll()
  },

  async find(id) {
    var user = await users.find(id)
    return { id: user.id, name: user.name, role: user.role, place_id: user.place_id }
  },

  async updateName(id, user) {
    var user = await users.updateName(id, user.name)
    return { id: user.id, name: user.name, role: user.role, place_id: user.place_id }
  },

  async changePassword(id, password, newPassword) {
    var user = await users.find(id)
    if (user) {
      if (user.hash === sec.generateHash(password, user.salt)) {
        var { hash, salt } = sec.generateSecurityCredentials(newPassword, 100)
        user = await users.updatePassword(id, hash, salt)
        return { id: user.id, name: user.name, role: user.role, place_id: user.place_id }
      }
    }
    throw new Error('Wrong credentials')
  },

  async create(user) {
    var { hash, salt } = sec.generateSecurityCredentials(user.password, 100)
    var user = await users.create(user.id, user.name, user.role, hash, salt, user.place_id)
    return { id: user.id, name: user.name, role: user.role, place_id: user.place_id }
  },

  async update(id, user) {
    var user = await users.update(id, user.name, user.place_id)
    return { id: user.id, name: user.name, role: user.role, place_id: user.place_id }
  },

  async delete(id) {
    var user = await users.delete(id)
    return { id: user.id, name: user.name, role: user.role, place_id: user.place_id }
  }
}