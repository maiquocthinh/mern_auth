const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { google } = require('googleapis')
const User = require('../models/user.model.js')
const { validateEmail, createToken, sendEmail } = require('../helpers')

const userController = {
	register: async (req, res) => {
		try {
			// get info
			const { name, email, password } = req.body

			// check fields
			if (!name || !email || !password) return res.status(400).json({ msg: 'Please fill in all fields.' })

			// check email validate
			if (!validateEmail(email)) return res.status(400).json({ msg: 'Please enter a valid email address.' })

			// check user
			const user = await User.findOne({ email: email })
			if (user) return res.status(400).json({ msg: 'This email is already registered on our systems.' })

			// check password
			if (password.length < 6) return res.status(400).json({ msg: 'Password must be at least 6 characters.' })
			// hash password
			const salt = await bcrypt.genSalt()
			const hashPassword = await bcrypt.hash(password, salt)

			// create token
			const userInfo = { name, email, password: hashPassword }
			const activationToken = createToken.activation(userInfo)

			// send mail
			const url = `${process.env.FRONTEND_URL}/api/auth/activate/${activationToken}`
			await sendEmail.verifyEmail(email, url, 'Verify your email')

			// registration success
			res.status(200).json({ msg: 'Welcome! Please check your email.' })
		} catch (err) {
			res.status(500).json({ msg: err.message })
		}
	},
	activate: async (req, res) => {
		try {
			// get activate token
			const { activation_token } = req.body

			// verify token
			const { name, email, password } = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN)
			// check user
			const user = await User.findOne({ email: email })
			if (user) return res.status(400).json({ msg: 'This email is registered.' })

			// save new user
			const newUser = new User({ name, email, password })
			await newUser.save()

			// activation success
			res.status(200).json({ msg: 'Your account have been activated, you can now sign in.' })
		} catch (err) {
			res.status(500).json({ msg: err.message })
		}
	},
	login: async (req, res) => {
		try {
			// get credential
			const { email, password } = req.body

			// check user
			const user = await User.findOne({ email: email })
			if (!user) return res.status(400).json({ msg: 'This email is not registered in our system.' })

			// check password
			const isMatch = await bcrypt.compare(password, user.password)
			if (!isMatch) return res.status(400).json({ msg: 'This password is incorrect.' })

			// create refresh token
			const refreshToken = createToken.refresh({ id: user._id })
			res.cookie('_apprftoken', refreshToken, {
				httpOnly: false,
				secure: true,
				sameSite: 'none',
				path: 'api/auth/access',
				maxAge: 24 * 60 * 60 * 1000,
			})

			// login success
			res.status(200).json({ msg: 'Login Success.' })
		} catch (err) {
			res.status(500).json({ msg: err.message })
		}
	},
	access: async (req, res) => {
		try {
			// get refresh token
			const refreshToken = req.cookies._apprftoken
			if (!refreshToken) return res.status(400).json({ msg: 'Please login.' })

			// validate
			const { id } = jwt.verify(refreshToken, process.env.REFRESH_TOKEN)
			if (!id) return res.status(400).json({ msg: 'Please login again.' })
			const accessToken = createToken.access({ id: id })
			res.status(200).json({ access_token: accessToken })
		} catch (err) {
			res.status(500).json({ msg: err.message })
		}
	},
	forgot: async (req, res) => {
		try {
			// get email
			const { email } = req.body
			if (!email) return res.status(400).json({ msg: 'Please enter your email.' })

			//check email
			const user = await User.findOne({ email: email })
			if (!user) return res.status(400).json({ msg: 'This email is not registered in our system.' })

			// create access token
			const accessToken = createToken.access({ id: user._id })

			// send mail
			const url = `${process.env.FRONTEND_URL}/reset-password/${accessToken}`
			await sendEmail.ResetPassword(email, url, 'Reset your password', user.name)

			// success
			res.status(200).json({ msg: 'Re-send your password. please check your email.' })
		} catch (err) {
			res.status(500).json({ msg: err.message })
		}
	},
	reset: async (req, res) => {
		try {
			// get password
			const { password } = req.body
			if (!password) return res.status(400).json({ msg: 'Please enter your password.' })
			else if (password.length < 6)
				return res.status(400).json({ msg: 'Password must be at least 6 characters.' })

			// hash password
			const salt = await bcrypt.genSalt()
			const hashPassword = await bcrypt.hash(password, salt)

			// update password
			await User.findByIdAndUpdate(req.user.id, { password: hashPassword })

			// success
			res.status(200).json({ msg: 'Password was update successfully.' })
		} catch (err) {
			res.status(500).json({ msg: err.message })
		}
	},
	info: async (req, res) => {
		try {
			// get user info without password
			const user = await User.findById(req.user.id).select('-password')

			// return user info
			res.status(200).json({ user })
		} catch (err) {
			res.status(500).json({ msg: err.message })
		}
	},
	update: async (req, res) => {
		try {
			// get info
			const { name, avatar } = req.body

			// update
			await User.findByIdAndUpdate(req.user.id, { name, avatar })

			// success
			res.status(200).json({ msg: 'Update Success.' })
		} catch (err) {
			res.status(500).json({ msg: err.message })
		}
	},
	logout: async (req, res) => {
		try {
			// clear cookie
			res.clearCookie('_apprftoken', { path: 'api/auth/access' })

			// success
			res.status(200).json({ msg: 'Logout success.' })
		} catch (err) {
			res.status(500).json({ msg: err.message })
		}
	},
	googleSignin: async (req, res) => {
		try {
			// get token id
			const { tokenId } = req.body

			// verify token id
			const client = new google.auth.OAuth2(process.env.G_CLIENT_ID)
			const verify = await client.verifyIdToken({ idToken: tokenId, audience: process.env.G_CLIENT_ID })

			// get data
			const { email_verified, email, name, picture } = verify.getPayload()

			// failed verification
			if (!email_verified) return res.status(400).json({ msg: 'Email verification failed.' })

			// passed verification
			const user = await User.findOne({ email: email })

			// if user exist / sign in
			if (user) {
				// create refresh token
				const refreshToken = createToken.refresh({ id: user._id })
				// store cookie
				res.cookie('_apprftoken', refreshToken, {
					httpOnly: false,
					secure: true,
					sameSite: 'none',
					path: 'api/auth/access',
					maxAge: 24 * 60 * 60 * 1000,
				})
			}

			// new user / create user
			else {
				// generate and hash password
				const password = email + process.env.G_CLIENT_ID
				const salt = await bcrypt.genSalt()
				const hashPassword = await bcrypt.hash(password, salt)

				// save new user
				const newUser = new User({ name, email, password: hashPassword, avatar: picture })
				const user = await newUser.save()

				// sign in the new user
				// create refresh token
				const refreshToken = createToken.refresh({ id: user._id })
				// store cookie
				res.cookie('_apprftoken', refreshToken, {
					httpOnly: false,
					secure: true,
					path: 'api/auth/access',
					maxAge: 24 * 60 * 60 * 1000,
				})
			}
			// success
			res.status(200).json({ msg: 'Signin with Google success.' })
		} catch (err) {
			res.status(500).json({ msg: err.message })
		}
	},
}

module.exports = userController
