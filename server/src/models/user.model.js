const { Schema, model } = require('mongoose')

const User = new Schema(
	{
		name: {
			type: String,
			required: 'Please enter your name',
			trim: true,
		},
		email: {
			type: String,
			required: 'Please enter your name',
			trim: true,
			unique: true,
		},
		password: {
			type: String,
			required: 'Please enter your name',
			min: 6,
		},
		avatar: {
			type: String,
			default: 'https://i.imgur.com/bSTGLI9.png',
		},
	},
	{
		timestamps: true,
	},
)

module.exports = model('users', User)
