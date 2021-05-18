const sql = require('sql-template-strings')
const db = require('../data-access/db')

module.exports = {
  async findAllRanges (guestId, placeId) {
    const { rows } = await db.query(sql`
      SELECT EXTRACT(DOW FROM lower(time_range)) AS start_day,
             EXTRACT(DOW FROM upper(time_range)) AS end_day,
             lower(time_range)::time AS start_time,
             upper(time_range)::time AS end_time
      FROM permissions
      WHERE guest_id = ${guestId} AND place_id = ${placeId}
    `)
    return rows
  },

  async update (id, timeRange) {
    const {rows} = await db.query(sql`
      INSERT
      INTO permissions (time_range)
      VALUES (${timeRange})
      WHERE id = ${id}
      RETURNING id
    `)
    const [user] = rows
    return user
  },

  async create (guestId, placeId, timeRange) {
    const {rows} = await db.query(sql`
      INSERT
      INTO permissions (guest_id, place_id, time_range)
      VALUES (${guestId}, ${placeId}, ${timeRange})
      RETURNING id
    `)
    const [user] = rows
    return user
  },

  async findAll () {
    const {rows} = await db.query(sql`
      SELECT id,
             place_id,
             guest_id,
             EXTRACT(DOW FROM lower(time_range)) AS start_day,
             EXTRACT(DOW FROM upper(time_range)) AS end_day,
             lower(time_range)::time AS start_time,
             upper(time_range)::time AS end_time
      FROM permissions
    `)
    return rows
  },

  async delete (id){
    const {rows} = await db.query(sql`
      DELETE
      FROM permissions
      WHERE id = ${id}
      RETURNING id
    `)
    const[user] = rows
    return user
  },

  async find (id) {
    const { rows } = await db.query(sql`
      SELECT id,
             place_id,
             guest_id,
             EXTRACT(DOW FROM lower(time_range)) AS start_day,
             EXTRACT(DOW FROM upper(time_range)) AS end_day,
             lower(time_range)::time AS start_time,
             upper(time_range)::time AS end_time
      FROM permissions
      WHERE id = ${id}
      LIMIT 1
    `)
    const [person] = rows
    return person
  }
}
