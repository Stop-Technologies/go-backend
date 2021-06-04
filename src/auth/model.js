const { authenticate } = require('../controllers/auth')
const TokensRepository = require('../repositories/tokens')
const config = require('./config')

module.exports = {
  getClient(clientId, clientSecret) {
    return new Promise((resolve, _) => {
      resolve({
        id: clientId,
        grants: config.grants
      })
    })
  },

  getUser(username, password) {
    return new Promise((resolve, reject) => {
      authenticate(username, password)
        .then((user) => {
          resolve({id: user.person_id})
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  getAccessToken(accessToken) {
    return new Promise((resolve, reject) => {
      TokensRepository.findByAccessToken(accessToken)
        .then((token) => {
          if (!token)
            resolve(false)

          token.accessToken = token.access_token
          token.accessTokenExpiresAt = token.access_token_expires_at
          token.refreshToken = token.refresh_token
          token.refreshTokenExpiresAt = token.refresh_token_expires_at
          token.user = { id: token.user_id }
          token.client = { id: 'go' }
          resolve(token)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  getRefreshToken(refreshToken) {
    return new Promise((resolve, reject) => {
      TokensRepository.findByRefreshToken(refreshToken)
        .then((token) => {
          if (!token)
            resolve(false)
          token.accessToken = token.access_token
          token.accessTokenExpiresAt = token.access_token_expires_at
          token.refreshToken = token.refresh_token
          token.refreshTokenExpiresAt = token.refresh_token_expires_at
          token.user = { id: token.user_id }
          token.client = { id: 'go' }
          resolve(token)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  saveToken(token, _, user) {
    return new Promise((resolve, reject) => {
      TokensRepository.updateOrCreate(
        user.id,
        token.accessToken,
        token.accessTokenExpiresAt,
        token.refreshToken,
        token.refreshTokenExpiresAt
      )
        .then((token) => {
          if (!token)
            resolve(false)

          token.accessToken = token.access_token
          token.accessTokenExpiresAt = token.access_token_expires_at
          token.refreshToken = token.refresh_token
          token.refreshTokenExpiresAt = token.refresh_token_expires_at
          token.user = { id: token.user_id }
          token.client = { id: 'go' }
          resolve(token)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  revokeToken(token) {
    return new Promise((resolve, reject) => {
      TokensRepository.delete(token.accessToken)
        .then((result) => {
          resolve(result != undefined)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}