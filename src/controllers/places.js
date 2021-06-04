const places = require('../repositories/places')

module.exports = {
  async findAll() {
    return await places.findAll()
  },

  async find(id) {
    return await places.find(id)
  },

  async create(place) { 
    return await places.create(place.name)
  },

  async update(id, place) {
    return await places.update(id, place.name)
  },

  async delete(id) {
    return await places.delete(id)
  }
}