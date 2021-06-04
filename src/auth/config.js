module.exports.grants = ['refresh_token', 'password']
module.exports.accessTokenLifetime = 60 * 60 * 24, // 24 hours, or 1 day
module.exports.refreshTokenLifetime = 60 * 60 * 24 * 2, // 48 hours, or 2 days
module.exports.allowEmptyState = true