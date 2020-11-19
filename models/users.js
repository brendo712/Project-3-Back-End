const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = Schema({

	userName: { type: String, unique: true, required: true },
	password: { type: String, required: true}

}, { timestamps: { createdAt: 'created_at' } })

const User = mongoose.model('User', userSchema)

module.exports = User
