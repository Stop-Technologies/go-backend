const guests = require('../repositories/guests')

module.exports = {
  async findAll() {
    return await guests.findAll()
  },

  async find(id) {
    return await guests.find(id)
  },

  async create(guest) {
    return await guests.create(guest.id, guest.name)
  },

  async update(id, guest) {
    return await guests.update(id, guest.name)
  },

  async delete(id) {
    return await guests.delete(id)
  }
}