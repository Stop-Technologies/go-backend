const sql = require('sql-template-strings')
const db = require('../data-access/db')

module.exports = {
  async find (id) {
    const { rows } = await db.query(sql`
      SELECT *
      FROM entries
      WHERE id = ${id}
      LIMIT 1
    `)
    const [entry] = rows
    return entry
  },

  async findByPlace (id) {
    const { rows } = await db.query(sql`
      SELECT *
      FROM entries
      WHERE place_id = ${id}
    `)
    return rows;
  },

  async findByPlaceAndGuest (place_id, guest_id) {
    const { rows } = await db.query(sql`
      SELECT *
      FROM entries
      WHERE place_id = ${place_id}
      AND guest_id = ${guest_id}
      ORDER BY time DESC
      LIMIT 1
    `)
    const [entry] = rows
    return entry
  },

  async findAll () {
    const {rows} = await db.query(sql`
      SELECT *
      FROM entries
    `)
    return rows
  },

  async create (guestId, placeId) {
    const {rows} = await db.query(sql`
      INSERT
      INTO entries (guest_id, place_id)
      VALUES (${guestId}, ${placeId})
      RETURNING *
    `)
    const [entry] = rows
    if (entry) {
      return await this.find(entry.id)
    }
    throw new Error('Cannot create entry')
  },

  async update (id, guestId, placeId) {
    const {rows} = await db.query(sql`
      UPDATE entries
      SET guest_id = ${guestId},
      place_id = ${placeId}
      WHERE id = ${id}
      RETURNING *
    `)
    const [entry] = rows
    if (entry) {
      return await this.find(entry.id)
    }
    throw new Error('Cannot update entry')
  },

  async delete (id) {
    const entry = await this.find(id)
    if (!entry) {
      throw new Error('Cannot delete entry')
    }
    await db.query(sql`
      DELETE
      FROM entries
      WHERE id = ${id}
      RETURNING *
    `)
    return entry
  }
}
