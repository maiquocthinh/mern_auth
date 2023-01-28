const jwt = require('jsonwebtoken')
const sendEmail = require('./sendMail.js')

const validateEmail = (email) =>
	String(email)
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
		)

const createToken = {
	activation: (payload) => jwt.sign(payload, process.env.ACTIVATION_TOKEN, { expiresIn: '5m' }),
	refresh: (payload) => jwt.sign(payload, process.env.REFRESH_TOKEN, { expiresIn: '24h' }),
	access: (payload) => jwt.sign(payload, process.env.ACCESS_TOKEN, { expiresIn: '15m' }),
}

module.exports = { validateEmail, createToken, sendEmail }
