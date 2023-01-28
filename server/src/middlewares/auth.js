const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
	try {
		// get access token
		const accessToken = req.header('Authorization')
		if (!accessToken) return res.status(400).json({ msg: 'Authentication failed.' })

		// validate
		const user = jwt.verify(accessToken, process.env.ACCESS_TOKEN)
		if (!user) return res.status(400).json({ msg: 'Authentication failed.' })

		// success
		req.user = user
		next()
	} catch (err) {
		res.status(500).json({ msg: err.message })
	}
}

module.exports = auth
