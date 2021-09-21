require('dotenv').config()

const config = {
  port: process.env.PORT,
  hashSecret: process.env.HASH_SECRET,
  twilio: {
    authToken: process.env.SMS_AUTH_TOKEN,
    sid: process.env.SMS_SID,
    smsFrom: process.env.SMS_FROM_NUMBER
  },
  dbUrl: process.env.DB_URL,
  jwt:{
    accessTokenSecret:process.env.JWT_ACCESS_TOKEN_SECRET,
    refreshTokenSecret:process.env.JWT_ACCESS_REFRESH_SECRET,
  }
}

module.exports = config