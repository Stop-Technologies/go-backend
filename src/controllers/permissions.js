const { inTimeRangesNow, makeTimeRange } = require('../util/time')
const permissions = require('../repositories/permissions')

module.exports = {
  async verifyAccess(guestId, placeId) {
    let ranges = await permissions.findRanges(guestId, placeId)
    return inTimeRangesNow(ranges)
  },

  async findAll() {
    return await permissions.findAll()
  },

  async find(id) {
    return await permissions.find(id) 
  },

  async create(permission){
    var timeRange = makeTimeRange(permission.start_day,
                                  permission.end_day,
                                  permission.start_time,
                                  permission.end_time)
    return await permissions.create(permission.guest_id,
                                    permission.place_id,
                                    timeRange)
  },

  async update(id, permission){
    var timeRange = makeTimeRange(permission.start_day,
                                  permission.end_day,
                                  permission.start_time,
                                  permission.end_time)
    return await permissions.update(id, timeRange)
  },

  async delete(id) {
    return await permissions.delete(id)
  }
}
