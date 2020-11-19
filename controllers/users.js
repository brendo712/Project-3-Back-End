const express = require('express')
const users = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/users.js')


// GET All USERS
users.get('/', (req, res) => {
	User.find({}, (err, foundUsers) => {
		if (err) {
			res.status(400).json({ error: err.message })
		}
		res.status(200).json(foundUsers)
	})
})


// CREATE USER
users.post('/', async (req, res) => {
	req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))

	User.create(req.body, (err, createdUser) => {
		if (err) {
			res.status(400).json({ error: err.message })
		}
		console.log(`User Created : ${createdUser}`)
		res.status(200).json(createdUser)
	})
})

users.delete('/:id', (req, res) => {
	User.findByIdAndRemove(req.params.id, (err, deletedUser) => {
		if (err) {
			res.status(400).json({ error: err.message })
		}
		console.log(`User Deleted : ${deletedUser}`)
		res.status(200).json(deletedUser)
	})
})

users.put('/:id', (req, res) => {
	req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
	User.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedUser) => {
		if (err) {
			res.status(400).json({ error: err.message })
		}
		console.log(`Updated User : ${updatedUser}`)
		res.status(200).json(updatedUser)
	})
})

module.exports = users
