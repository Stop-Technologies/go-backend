const sql = require('sql-template-strings');
const db = require('../data-access/db');
// This is only an example model

module.exports = {
  async create(id, name, role , password) {
    try {
      const {rows} = await db.query(sql`
      INSERT INTO users (id, name, role, password)
        VALUES (${id}, ${name}, ${role}, ${password})
        RETURNING id;
      `);

      const [user] = rows;
      return user;
    } catch (error) {
      if (error.constraint === 'users_id_key') {
        return null;
      }

      throw error;
    }
  },

  async findAll() {
    const {rows} = await db.query(sql`
    SELECT * FROM users;
    `);
    return rows;
  },

  async delete(id){
    try{
      const {rows} = await db.query(sql`
      DELETE FROM users WHERE id = ${id}
      RETURNING id;
      `);
      const[user] = rows;
      return user;
    }catch(error){
      throw error;
    }
  }
};