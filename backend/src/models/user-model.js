const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String },
  avatar: { type: String },
  phone: { type: String, required: true },
  email: { type: String, },
  activated: { type: Boolean, default: false },
}, {
  timestamps: true,
})

module.exports = mongoose.model('User', userSchema, 'users')