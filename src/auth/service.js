const OAuthServer = require('express-oauth-server')
const model = require('./model')
const config = require('./config')
const users = require('../controllers/users')

const server = new OAuthServer({
  model: model,
  grants: config.grants,
  accessTokenLifetime: config.accessTokenLifetime, // 24 hours, or 1 day
  refreshTokenLifetime: config.refreshTokenLifetime, // 48 hours, or 2 days
  allowEmptyState: config.allowEmptyState,
})

const token = async (req, res, next) => {
  // Token revocation
  let token_type = req.body.token_type_hint
  if (token_type) {
    let token
    if (token_type === 'refresh_token') {
      token = await model.getRefreshToken(req.body.token)
    }
    if (token_type === 'access_token') {
      token = await model.getAccessToken(req.body.token)
    }
    if (token) {
      await model.revokeToken(token)
      res.send({ message: 'Token revoked', success: true })
    }
  } else {
    // Default token management
    server.token({
      requireClientAuthentication: {
        password: false,
        refresh_token: false,
      },
    })(req, res, next)
  }
}

const authorize = (roles) => {
  return (req, res, next) => {
    // Save user object to res.locals on the authorization process
    // On this context authenticate achieves authorization
    server.authenticate()(req, res, async () => {
      let userId = res.locals.oauth.token.user.id
      res.locals.user = await users.find(userId)
      if (res.locals.user) {
        if (roles.includes(res.locals.user.role)) {
          next()
        } else {
          res.status(500).send({ error: 'User is not authorized', success: false })
        }
      } else {
        res.status(500).send({ error: 'User is not authorized', success: false })
      }
    })
  }
}

module.exports = {
  token,
  authorize,
}