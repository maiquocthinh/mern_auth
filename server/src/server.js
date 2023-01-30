const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express()
require('dotenv').config()
const useRoutes = require('./routes')

// constant
const PORT = process.env.PORT || 8000
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/auth_mern'
const corsOptions = {
	origin: process.env.FRONTEND_URL,
	credentials: true,
	optionsSuccessStatus: 200,
}

// database
mongoose.connect(MONGO_URI, { useUnifiedTopology: true }, (err) => {
	if (err) throw err
	console.log('db connected')

	app.listen(PORT, () => {
		console.log(`Server running at 'http://localhost:${PORT}'`)
	})
})

// middleware
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// static
app.use('/uploads', express.static('./uploads'))

// routes
useRoutes(app)
