const mongoose = require('mongoose')
const { dbUrl } = require('./config')

const dbConnect = async () => {
  mongoose.connect(dbUrl, {
    useNewUrlParser: true
  })
  const db = mongoose.connection
  db.on('error', console.error.bind(console,'DB CONNECTION FAILED'))
  db.once('open', () => {
    console.log('DB CONNECTED');
  })
}

module.exports = dbConnect