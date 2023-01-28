const fs = require('fs')

const uploadImage = (req, res, next) => {
	// check file exist
	if (typeof req.file === 'undefined' || typeof req.body === 'undefined')
		return res.status(400).json({ msg: 'Issue with uploading this file.' })

	// get file path
	const imagePath = req.file.path

	// check file type
	if (!req.file.mimetype.match(/(jpg|jpeg|png)$/i)) {
		return res.status(400).json({ msg: 'This file is not supported.' })
	}

	// check file size
	if (req.file.size > 1024 * 1024) {
		fs.unlinkSync(imagePath)
		return res.status(400).json({ msg: 'This file is to large (Max: 1MB)' })
	}

	// success
	next()
}

module.exports = uploadImage
