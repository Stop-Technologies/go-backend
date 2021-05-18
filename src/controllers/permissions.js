const { findAllRanges: findRanges } = require('../repositories/permissions')
const { inTimeRangesNow } = require('../util/time')

module.exports.verifyAccess = async function (guestId, placeId) {
  let ranges = await findRanges(guestId, placeId)
  return inTimeRangesNow(ranges)
}
