const crypto = require('crypto')
const { hashSecret } = require('../config')

class Hash {
  hashOtp(data) {
    return crypto.createHmac('sha256', hashSecret)
      .update(data)
      .digest('hex')
  }
}

module.exports = new Hash