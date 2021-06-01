const { findAllRanges: findRanges } = require('../repositories/permissions')
const { inTimeRangesNow } = require('../util/time')
const permissions = require('../repositories/permissions')


module.exports = {

  async function(guestId, placeId) {
    let ranges = await findRanges(guestId, placeId)
    return inTimeRangesNow(ranges)
  },

  find(){
    let permissions = await permissions.findAll();
    return permissions; 
  },

  find(id){
    let permission = await permissions.find(id);
    return permission; 
  },

  create(startDay, endDay, startTime, endTime){
    let permission = await permissions.create(guestId, placeId,
      timeRange);
    return permission;
  },

  update(id, startDay, endDay, startTime, endTime){
    let permission = await permissions.create(id, startDay,
      endDay, startTime, endTime);
    return permission;
  }
}
