const express = require('express')
const mongoose = require('mongoose')
const app = express()
require('dotenv').config()

// constant
const PORT = process.env.PORT || 8000
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/auth_mern'

// database
mongoose.connect(MONGO_URI, { useUnifiedTopology: true }, (err) => {
	if (err) throw err
	console.log('db connected')

	app.listen(PORT, () => {
		console.log(`Server runing at 'http://localhost:${PORT}'`)
	})
})

// middleware

// routes
