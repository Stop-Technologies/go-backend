const sql = require('sql-template-strings');
const db = require('../data-access/db');

module.exports = {
  async create(user_id, period) {
    const {rows} = await db.query(sql`
    INSERT INTO permissions (user_id, period)
      VALUES (${user_id}, ${period})
      RETURNING id, user_id, period;
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
    SELECT * FROM permissions where user_id = ${id};
    `);
    return rows;
  },

  async findPeriod(id, next){
    const {rows} = await db.query(sql`
    SELECT period FROM permissions where user_id = ${id};
    `);
    console.log(rows);
    return rows;
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