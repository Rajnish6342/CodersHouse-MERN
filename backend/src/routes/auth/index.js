const { sendOtp, verifyOtp, activate, refresh } = require("../../controllers/auth")
const authMiddleware = require('./../../middlewares/auth-middleware')

const authRoute = async (app) => {
  app.post('/send-otp', sendOtp)
  app.post('/verify-otp', verifyOtp)
  app.post('/activate', authMiddleware, activate)
  app.get('/refresh', refresh)
}

module.exports = authRoute