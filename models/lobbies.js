const mongoose = require('mongoose')
const { Schema } = mongoose

const lobbySchema = new Schema({
		name: String,
		owner: {
			type: String,
			ref: 'User'
		},
		size: Number,
		players: {
			type: Array,
			default: []
		},
		prize: Number
})

module.exports = mongoose.model('Lobby', lobbySchema)
