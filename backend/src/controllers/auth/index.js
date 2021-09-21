const Jimp = require('jimp')
const path = require('path')

const { hashOtp } = require("../../services/hash")
const otp = require("../../services/otp")
const { generateOtp, sendBySms, verifyOtp } = require("../../services/otp")
const { generateTokens, storeRefreshToken, verifyRefreshToken, findRefreshToken, updateRefreshToken, } = require("../../services/token")
const { findUser, createUser } = require("../../services/user")

class Auth {
  async sendOtp(req, res) {
    try {
      const { phone } = req.body
      if (!phone) {
        return res.status(400).json({ message: 'PhoneNumber Required' })
      }
      const ttl = 1000 * 60 * 20
      const otp = generateOtp()
      const expires = Date.now() + ttl;
      const data = `${phone}.${otp}.${expires}`
      const hash = hashOtp(data)
      console.log(otp);
      // await sendBySms(phone, otp)
      return res.json({ hash: `${hash}.${expires}`, phone, otp })
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: 'Message sending failed' })
    }
  }
  async verifyOtp(req, res) {
    try {
      const { otp, phone, hash } = req.body
      if (!phone || !otp || !hash) {
        return res.status(400).json({ message: 'PhoneNumber Required' })
      }
      const [hashedOtp, expires] = hash.split('.')
      if (Date.now() > +expires) {
        return res.status(400).json({ message: 'Otp Expired' })
      }
      const data = `${phone}.${otp}.${expires}`
      console.log(data);
      const isValid = verifyOtp(hashedOtp, data)
      if (!isValid) {
        return res.status(400).json({ message: 'Invalid Otp' })
      }
      let user = await findUser({ phone })
      if (!user) {
        user = await createUser({ phone })
      }
      const { accessToken, refreshToken } = generateTokens({ id: user._id, phone, activated: user.activated })
      await storeRefreshToken(refreshToken, user._id)
      res.cookie('refreshToken', refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 60,
        httpOnly: true
      })
      res.cookie('accessToken', accessToken, {
        maxAge: 1000 * 60 * 60 * 24 * 60,
        httpOnly: true
      })
      return res.json({ auth: true, user })
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: 'User Create Failed' })
    }
  }
  async activate(req, res) {
    try {
      const { name, avatar } = req.body
      if (!name || !avatar) {
        return res.status(400).json({ message: "All fields are required" })
      }
      const buffer = Buffer.from(avatar.split('base64,')[1], 'base64')
      const imagePath = `${Date.now()}-${Math.random(Math.random() * 1e9)}.png`
      const jimpResp = await Jimp.read(buffer)
      jimpResp.resize(150, Jimp.AUTO).write(path.resolve(__dirname, `../../storage/${imagePath}`))
      const userId = req.user.id
      const user = await findUser({ _id: userId })
      if (!user) {
        res.status(404).json({ message: 'User not found' })
      }

      user.activated = true;
      user.name = name;
      user.avatar = `/storage/${imagePath}`
      user.save()
      res.json({ user, auth: true })

    } catch (error) {
      console.log(error);
    }
  }
  async refresh(req, res) {
    // get refresh token from cookie
    const { refreshToken: refreshTokenFromCookie } = req.cookies;
    // check if token is valid
    let userData;
    try {
      userData = await verifyRefreshToken(
        refreshTokenFromCookie
      );
    } catch (err) {
      return res.status(401).json({ message: 'Invalid Token' });
    }
    console.log('refreshTokenFromCookie',userData);
    // Check if token is in db
    try {
      const token = await findRefreshToken(
        userData.id,
        refreshTokenFromCookie
      );
      console.log(token);
      if (!token) {
        return res.status(401).json({ message: 'Invalid token' });
      }
    } catch (err) {
      return res.status(500).json({ message: 'Internal error' });
    }
    // check if valid user
    const user = await findUser({ _id: userData.id });
    if (!user) {
      return res.status(404).json({ message: 'No user' });
    }
    // Generate new tokens
    const { refreshToken, accessToken } = generateTokens({
      id: userData.id,
    });

    // Update refresh token
    try {
      await updateRefreshToken(userData.id, refreshToken);
    } catch (err) {
      console.log(err);

      return res.status(500).json({ message: 'Internal error' });
    }
    // put in cookie
    res.cookie('refreshToken', refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    res.cookie('accessToken', accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });
    // response
    res.json({ user, auth: true });
  }
}

module.exports = new Auth()