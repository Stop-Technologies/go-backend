const sql = require('sql-template-strings');
const db = require('../data-access/db');
// This is only an example model

module.exports = {
  async create(email, password) {
    try {
      const {rows} = await db.query(sql`
      INSERT INTO users (email, password)
        VALUES (${email}, ${password})
        RETURNING email;
      `);

      const [user] = rows;
      return user;
    } catch (error) {
      if (error.constraint === 'users_email_key') {
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
  }
};