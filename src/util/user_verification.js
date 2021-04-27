const permissions = require('../models/permission.js');

module.exports = (user_id, callback) => {
    var time = new Date().toISOString().
        replace(/T/, ' ').
        replace(/\..+/, '');

    }
