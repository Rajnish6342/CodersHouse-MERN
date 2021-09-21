const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const config = require('./src/config')
const dbConnect = require('./src/db-client')
const router = require('./src/routes')
const path = require('path')

const PORT = config.port || 5000

const app = express()

app.use(express.json({
  limit: '10mb'
}))
app.use(cookieParser());
console.log(path.join(__dirname, 'src','storage'));
app.use('/storage', express.static(path.join(__dirname, 'src','storage')));
app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000']
}))

//Database Connection
dbConnect()

//Router
router(app)

app.listen(PORT, () => {
  console.log('Listening on ', PORT);
})
