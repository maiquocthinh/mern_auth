const cloudinary = require('cloudinary').v2
const fs = require('fs')

// Cloudinary config
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_SECRET_KEY,
	secure: true,
})

const uploadController = {
	uploadAvatar: async (req, res) => {
		let urlImg = ''

		// get file
		const file = req.file
		urlImg = req.protocol + '://' + req.get('host') + '/' + file.path

		// upload to cloudinary, if any
		const { cloudinary: cloudinaryUpload } = req.body
		if (cloudinaryUpload) {
			try {
				const result = await cloudinary.uploader.upload(file.path, {
					folder: 'mern_auth_avatar',
					width: 150,
					height: 150,
					crop: 'fill',
				})
				fs.unlinkSync(file.path) // remove file in my server
				urlImg = result.secure_url
			} catch (error) {
				throw error
			}
		}

		// succes
		res.status(200).json({
			msg: 'Upload successfully.',
			url: urlImg,
		})
	},
}

module.exports = uploadController
