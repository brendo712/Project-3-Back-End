const express = require('express')
const mongoose = require('mongoose')
//const cors = require('cors')
const app = express()
const Lobby = require('./models/lobbies.js')
require('dotenv').config()

const PORT = process.env.PORT
const mongodbURI = process.env.MONGODBURI


app.use(express.json())


mongoose.connection.on('error', err => console.log(err.message + ' is Mongod not running?'))
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'))

//...farther down the page
mongoose.connect(mongodbURI', { useNewUrlParser: true , useUnifiedTopology: true})
mongoose.connection.once('open', ()=>{
    console.log('connected to mongoose...')
})

const lobbiesController = require('./controllers/lobbies.js')
const usersController = require('./controllers/users.js')

app.use('/lobbies', lobbiesController)
app.use('/users', usersController)

app.listen(PORT, () => {
  console.log('express listening on port', PORT)
})
