const crypto = require('crypto')
const { twilio: { authToken, sid, smsFrom } } = require('../config')
const { hashOtp } = require('./hash')

const twilio = require('twilio')(sid, authToken, {
  lazyLoading: true
})

class Otp {
  generateOtp() {
    return crypto.randomInt(1000, 9999)
  }

  async sendBySms(phone, otp) {
    return twilio.messages.create({
      to: phone,
      from: smsFrom,
      body: otp
    })
  }

  async verifyOtp(hashedOtp, data) {
    const computedHash = hashOtp(data)
    return computedHash === hashedOtp
  }
}

module.exports = new Otp()