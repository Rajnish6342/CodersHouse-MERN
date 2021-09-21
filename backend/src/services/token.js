const jwt = require('jsonwebtoken')
const refreshModel = require('./../models/refresh-model')
const { jwt: { accessTokenSecret, refreshTokenSecret } } = require('../config')

class TokenService {
  generateTokens(payload) {
    console.log(payload);
    const accessToken = jwt.sign(payload, accessTokenSecret, {
      expiresIn: '1h'
    })
    const refreshToken = jwt.sign(payload, refreshTokenSecret, {
      expiresIn: '1h'
    })
    return {
      accessToken,
      refreshToken
    }
  }
  async storeRefreshToken(token, userId) {
    try {
      await refreshModel.create({
        token,
        userId
      });
    } catch (error) {
      console.error(error.message);
    }
  }
  async verifyAccessToken(token) {
    return jwt.verify(token, accessTokenSecret)
  }
  async verifyRefreshToken(refreshToken) {
    return jwt.verify(refreshToken, refreshTokenSecret);
  }
  async findRefreshToken(userId, refreshToken) {
    return await refreshModel.findOne({
      userId: userId,
      token: refreshToken,
    });
  }
  async updateRefreshToken(userId, refreshToken) {
    return await refreshModel.updateOne(
        { userId: userId },
        { token: refreshToken }
    );
}

async removeToken(refreshToken) {
    return await refreshModel.deleteOne({ token: refreshToken });
}
}

module.exports = new TokenService()