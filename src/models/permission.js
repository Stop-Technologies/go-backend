const sql = require('sql-template-strings');
const db = require('../data-access/db');

module.exports = {
  async create(user_id, time_start, time_end) {
    const {rows} = await db.query(sql`
    INSERT INTO permissions (user_id, time_start, time_end)
      VALUES (${user_id}, ${time_start}, ${time_end})
      RETURNING id, user_id, time_start, time_end;
    `);

    const [access] = rows;
    return access;
  },

  async findAll() {
    const {rows} = await db.query(sql`
    SELECT * FROM permissions;
    `);
    return rows;
  },

  async find(id){
    const {rows} = await db.query(sql`
    SELECT FROM permissions where id = ${id};
    `);
  },

  async delete(id){
    const {rows} = await db.query(sql`
    DELETE FROM permissions WHERE id = ${id}
    RETURNING id;
    `);
    const[access] = row;
    return access;
  }
};