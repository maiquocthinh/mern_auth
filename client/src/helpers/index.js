import axios from 'axios'

// check empty fields
export const isEmpty = (value) => !value

// check email format
export const isEmail = (email) =>
	String(email)
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
		)

// check password length
export const isLengthNotEnough = (password) => password?.length < 6

// check password match
export const isMatch = (password, cf_password) => password === cf_password

// axios client
export const axiosClient = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	withCredentials: true,
})
