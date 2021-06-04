const sql = require('sql-template-strings')
const db = require('../data-access/db')

module.exports = {
  async find (id) {
    const { rows } = await db.query(sql`
      SELECT id, name
      FROM guests INNER JOIN people ON guests.person_id = people.id
      WHERE person_id = ${id}
      LIMIT 1
    `)
    const [guest] = rows
    return guest
  },

  async findAll () {
    const {rows} = await db.query(sql`
      SELECT id, name
      FROM guests INNER JOIN people ON guests.person_id = people.id
    `)
    return rows
  },

  async create (id, name) {
    await db.query(sql`
      BEGIN TRANSACTION
    `)
    await db.query(sql`
      INSERT
      INTO people (id, name)
      VALUES (${id}, ${name})
    `)
    await db.query(sql`
      INSERT
      INTO guests (person_id)
      VALUES (${id})
    `)
    await db.query(sql`
      END TRANSACTION
    `)
    return await this.find(id)
  },

  async update (id, name) {
    const { rows } = await db.query(sql`
      UPDATE people
      SET name = ${name}
      WHERE id = ${id}
      RETURNING *
    `)
    const [guest] = rows
    return guest
  },

  async delete (id){
    const guest = await this.find(id)
    await db.query(sql`
      BEGIN TRANSACTION
    `)
    await db.query(sql`
      DELETE
      FROM guests
      WHERE person_id = ${id}
    `)
    await db.query(sql`
      DELETE
      FROM people
      WHERE id = ${id}
    `)
    await db.query(sql`
      END TRANSACTION
    `)
    return guest
  },
}
