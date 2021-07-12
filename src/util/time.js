function pad(num, size) {
  num = num.toString()
  while (num.length < size)
    num = "0" + num
  return num
}

module.exports.inTimeRangesNow = function (ranges) {
  let now = new Date()
  let actual_day = now.getDay()
  let actual_time = `${pad(now.getHours(), 2)}:${pad(now.getMinutes(), 2)}:00`
  return ranges.some((range) => {
    let day_validation = range.start_day % 7 <= actual_day && range.end_day % 7 >= actual_day
    let time_validation = range.start_time <= actual_time && range.end_time >= actual_time
    return day_validation && time_validation
  })
}

module.exports.inTimeRanges = function (entry_time, ranges) {
  date = new Date(entry_time)
  let actual_day = date.getDay()
  let actual_time = `${pad(date.getHours(), 2)}:${pad(date.getMinutes(), 2)}:00`
  return ranges.some((range) => {
    let day_validation = range.start_day % 7 <= actual_day && range.end_day % 7 >= actual_day
    let time_validation = range.start_time <= actual_time && range.end_time >= actual_time
    return day_validation && time_validation
  })
}

module.exports.countInTimeRanges = function (entry_time, ranges) {
  date = new Date(entry_time)
  let actual_day = date.getDay()
  let actual_time = `${pad(date.getHours(), 2)}:${pad(date.getMinutes(), 2)}:00`
  let count = 0
  for (let i = 0; i < ranges.length; i++) {
    range = ranges[i]
    let day_validation = range.start_day % 7 <= actual_day && range.end_day % 7 >= actual_day
    let time_validation = range.start_time <= actual_time && range.end_time >= actual_time
    if (day_validation && time_validation) count++;
  }
  return count;
}

module.exports.makeTimeRange = function (startDay, endDay, startTime, endTime) {
  startDay = pad(startDay,2)
  endDay = pad(endDay,2)
  return `[1996-01-${startDay} ${startTime}:00, 1996-01-${endDay} ${endTime}:00]`
}