const express = require('express')
const lobbies = express.Router()
const Lobby = require('../models/lobbies.js')

lobbies.get('/', (req, res) => {
	Lobby.find({}, (err, foundLobbies) => {
		if (err) {
			res.status(400).json({ error: err.message})
		}
		res.status(200).json(foundLobbies)
	})
})

lobbies.delete('/:id', (req, res) => {
  Lobby.findByIdAndRemove(req.params.id, (err, deletedLobby) => {
    if (err) {
      res.status(400).json({ error: err.message })
    }
    console.log('Lobby Deleted:', deletedLobby)
    res.status(200).json(deletedLobby)
  })
})

lobbies.post('/', async (req, res) => {
  Lobby.create(req.body, (error, createdLobby) => {
    if (error) {
      res.status(400).json({ error: error.message })
    }
    console.log('Lobby Created:', createdLobby)
    res.status(200).send(createdLobby) //  .json() will send proper headers in response so client knows it's json coming back
  })
})

lobbies.put('/:id', (req, res) => {
  Lobby.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedLobby) => {
    if (err) {
      res.status(400).json({ error: err.message })
    }
    console.log('Updated Lobby:', updatedLobby)
    res.status(200).json(updatedLobby)
  })
})

module.exports = lobbies
