const { countInTimeRanges } = require('../util/time')
const entries = require('../repositories/entries')
const permissions = require('../repositories/permissions')
const { findRangesByPlace } = require('../repositories/permissions')

module.exports = {
  async findAll() {
    return await entries.findAll()
  },

  async find(id) {
    return await entries.find(id)
  },

  async findByPlace(placeId) {
    return await entries.findByPlace(placeId)
  },

  async findByPlaceAndGuest(placeId, guestId) {
    return await entries.findByPlaceAndGuest(placeId, guestId)
  },

  async create(guestId, placeId) {

    return await entries.create(guestId, placeId)
  },

  async update(id, guestId, placeId) {
    return await entries.update(id, guestId, placeId)
  },

  async delete(id) {
    return await entries.delete(id)
  },

  async isGuestAlready(placeId, guestId) {
    let last_entry = await module.exports.findByPlaceAndGuest(placeId, guestId)
    if (typeof last_entry != 'undefined') {
      let ranges = await permissions.findRanges(guestId, placeId)
      return inTimeRanges(last_entry.time, ranges);
    }
    return false;
  },

  async countCurrentGuests(placeId){
    let entries = await module.exports.findByPlace(placeId)
    console.log(entries);
    let currentGuests = 0;
    if (typeof entries != 'undefined'){
      for(let i = 0; i < entries.length; i++){
        let ranges = await permissions.findRanges(entries[i].guest_id, entries[i].place_id)
        currentGuests += countInTimeRanges(entries[i].time, ranges);
      }
      return currentGuests;
    }else{
      return false;
    }
  }
}
