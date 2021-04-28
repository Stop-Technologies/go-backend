const perm = require('../models/permission.js');
module.exports = async (user_id, res, callback) => {
    try {
        console.log(user_id);
        const permissions = await perm.findPeriod(user_id)
        var finded = false
        permissions.forEach(permission => {
            let times = permission.period.split(",");
            let init = new Date(times[0].substr(1, times[0].length - 2)).valueOf();
            let end = new Date(times[1].substr(0, times[1].length - 2)).valueOf();
            let currentTime = new Date().valueOf() - 5 * 3600 * 1000;
            if (init < currentTime && end > currentTime) {
                finded = true;
            }
        });
        callback(finded, null);
    } catch (error) {
        callback(null, error);
    }
}
