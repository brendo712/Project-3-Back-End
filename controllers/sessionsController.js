const express = require('express')
const bcrypt = require('bcrypt')
const session = express.Router()
const User = require('../models/users.js')

session.get('/new', (req, res) => {

})

session.post('/', (req, res) => {
	console.log(req.body)
	User.findOne({ username: req.body.username }, (err, foundUser) => {
		if (err) {
			res.status(400).json({ error: err.message })
			console.log(`Unexpected issue : ${err}`)

		} else if (!foundUser) {
			res.status(404).json({ error: err.message})
			console.log(`User Not found : ${err}`)
		} else {
			if (bcrypt.compareSync(req.body.password, foundUser.password)) {
				req.session.currentUser = foundUser
				res.status(200).json(foundUser)
				console.log(`Logged in succesfuly : ${foundUser}`)
				res.redirect('/')
			} else {
				res.status(400)
				console.log('Incorrect password or username')

			}
		}
	})
})

session.delete('/', (req, res) => {
	req.session.destroy(() => {
		res.redirect('/')
	})
})

module.exports = session
