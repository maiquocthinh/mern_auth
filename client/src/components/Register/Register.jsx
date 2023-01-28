import Input from '../Input'
import '../Login/Login.scss'
import MailLineIcon from 'remixicon-react/MailLineIcon'
import LockPasswordLineIcon from 'remixicon-react/LockPasswordLineIcon'
import GoogleFillIcon from 'remixicon-react/GoogleFillIcon'
import User3LineIcon from 'remixicon-react/User3LineIcon'
import EyeLineIcon from 'remixicon-react/EyeLineIcon'
import EyeOffLineIcon from 'remixicon-react/EyeOffLineIcon'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { isEmail, isEmpty, isLengthNotEnough, isMatch } from '../../helpers'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'

const initDataState = {
	name: '',
	email: '',
	password: '',
	cf_password: '',
}

const Register = () => {
	const [visible, setVisible] = useState(false)
	const navigate = useNavigate()
	const [data, setData] = useState(initDataState)

	const handleIconClick = () => {
		setVisible(!visible)
	}

	const handleInputChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value })
	}

	const register = async (e) => {
		e.preventDefault()
		const { name, email, password, cf_password } = data

		// check fields
		if (isEmpty(name) || isEmpty(password))
			return toast('Please fill in all fields.', {
				className: 'toast-failed',
				bodyClassName: 'toast-failed',
				pauseOnHover: false,
			})
		// check email format
		if (!isEmail(email))
			return toast('Please enter a valid email address.', {
				className: 'toast-failed',
				bodyClassName: 'toast-failed',
				pauseOnHover: false,
			})
		// check password length
		if (isLengthNotEnough(password))
			return toast('Password must be at least 6 characters.', {
				className: 'toast-failed',
				bodyClassName: 'toast-failed',
				pauseOnHover: false,
			})
		// check confirm password is match with password
		if (!isMatch(password, cf_password))
			return toast('Password did not match.', {
				className: 'toast-failed',
				bodyClassName: 'toast-failed',
				pauseOnHover: false,
			})

		try {
			const response = await axios.post('/api/auth/register', { name, email, password })
			toast(response.data.msg, {
				className: 'toast-success',
				bodyClassName: 'toast-success',
				pauseOnHover: false,
			})
		} catch (error) {
			toast(error.response.data.msg, {
				className: 'toast-failed',
				bodyClassName: 'toast-failed',
				pauseOnHover: false,
			})
		}
	}

	return (
		<>
			<ToastContainer />
			<div className="login">
				<div className="title">
					<span>register</span>
				</div>
				<form onSubmit={register}>
					<Input
						type="text"
						name="name"
						text="Name"
						icon={<User3LineIcon size={16} />}
						handleChange={handleInputChange}
					/>
					<Input
						type="email"
						name="email"
						text="Email"
						icon={<MailLineIcon size={16} />}
						handleChange={handleInputChange}
					/>
					<Input
						type={visible ? 'text' : 'password'}
						name="password"
						text="Password"
						icon={<LockPasswordLineIcon size={16} />}
						icon2={visible ? <EyeLineIcon size={16} /> : <EyeOffLineIcon size={16} />}
						handleIconClick={handleIconClick}
						handleChange={handleInputChange}
					/>
					<Input
						type={visible ? 'text' : 'password'}
						name="cf_password"
						text="Confirm Password"
						icon={<LockPasswordLineIcon size={16} />}
						icon2={visible ? <EyeLineIcon size={16} /> : <EyeOffLineIcon size={16} />}
						handleIconClick={handleIconClick}
						handleChange={handleInputChange}
					/>
					<div className="login_btn">
						<button type="submit">register</button>
						<button>
							signin with <GoogleFillIcon size={16} style={{ marginLeft: '4px' }} />
						</button>
					</div>
				</form>
				<div className="login_actions">
					<div className="navigate">
						<p>Already have an account?</p>
						<button
							onClick={() => {
								navigate('/login')
							}}
						>
							Login
						</button>
					</div>
				</div>
			</div>
		</>
	)
}

export default Register
