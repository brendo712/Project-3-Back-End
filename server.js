const express = require('express')
const mongoose = require('mongoose')
//const cors = require('cors')
const app = express()
const Lobby = require('./models/lobbies.js')


const PORT = 3003


app.use(express.json())


mongoose.connection.on('error', err => console.log(err.message + ' is Mongod not running?'))
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'))

//...farther down the page
mongoose.connect('mongodb://localhost:27017/mwlobbies', { useNewUrlParser: true , useUnifiedTopology: true})
mongoose.connection.once('open', ()=>{
    console.log('connected to mongoose...')
})

const lobbiesController = require('./controllers/lobbies.js')

app.use('/lobbies', lobbiesController)

app.listen(PORT, () => {
  console.log('express listening on port', PORT)
})
