const { verifyAccessToken } = require("../services/token")

module.exports = async function (req, res, next) {
  try {
    const { accessToken } = req.cookies
    if (!accessToken) {
      throw new Error()
    }
    const userData = await verifyAccessToken(accessToken)
    req.user = userData
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  next()
}