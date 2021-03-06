const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const Lobby = require('./models/lobbies.js')
const session = require('express-session')
require('dotenv').config()
const PORT = process.env.PORT
const mongodbURI = process.env.MONGODBURI
app.use(express.json())

const whitelist = ['http://localhost:3000', 'http://localhost:3003', 'http://localhost:5000', 'https://project-3-group-7-front.herokuapp.com']
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }, credentials: true
}

app.use(cors(corsOptions))
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialiazed: false
  })
)

mongoose.connection.on('error', err => console.log(err.message + ' is Mongod not running?'))
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'))

//...farther down the page
mongoose.connect(mongodbURI, { useNewUrlParser: true , useUnifiedTopology: true})
mongoose.connection.once('open', ()=>{
    console.log('connected to mongoose...')
})

const lobbiesController = require('./controllers/lobbies.js')
const usersController = require('./controllers/users.js')
const sessionsController = require('./controllers/sessionsController.js')

app.use('/lobbies', lobbiesController)
app.use('/users', usersController)
app.use('/sessions', sessionsController)

app.listen(PORT, () => {
  console.log('express listening on port', PORT)
})
