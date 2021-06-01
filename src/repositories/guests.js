const sql = require('sql-template-strings')
const db = require('../data-access/db')

module.exports = {
  async create (id) {
    const {rows} = await db.query(sql`
      INSERT
      INTO guests (person_id)
      VALUES (${id})
      RETURNING person_id;
    `)
    const [user] = rows
    return user
  },

  async findAll () {
    const {rows} = await db.query(sql`
      SELECT *
      FROM guests;
    `)
    return rows
  },

  async find (id) {
    const { rows } = await db.query(sql`
      SELECT *
      FROM guests
      WHERE person_id = ${id}
      LIMIT 1;
    `)
    const [person] = rows
    return person
  },

  async update (id, newId) {
    const { rows } = await db.query(sql`
      UPDATE guests
      SET id = ${newId}
      WHERE person_id = ${id};
    `)
    const [person] = rows
    return person
  }
}
