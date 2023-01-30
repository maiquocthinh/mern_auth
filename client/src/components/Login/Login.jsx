import { useState } from 'react'
import Input from '../../components/Input'
import './Login.scss'
import MailLineIcon from 'remixicon-react/MailLineIcon'
import LockPasswordLineIcon from 'remixicon-react/LockPasswordLineIcon'
import GoogleFillIcon from 'remixicon-react/GoogleFillIcon'
import EyeFillIcon from 'remixicon-react/EyeFillIcon'
import EyeOffFillIcon from 'remixicon-react/EyeOffFillIcon'
import { useNavigate, useLocation } from 'react-router-dom'
import { isEmail, isEmpty } from '../../helpers'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { axiosClient as axios } from '../../helpers'
import { useAuthStore } from '../../context/AuthHooks'

const Login = () => {
	const [visible, setVisible] = useState(false)
	const navigate = useNavigate()
	const loaction = useLocation()
	const { dispatch } = useAuthStore()
	const [data, setData] = useState({ email: '', password: '' })

	const handleIconClick = () => {
		setVisible(!visible)
	}

	const handleInputChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value })
	}

	const login = async (e) => {
		e.preventDefault()
		const { email, password } = data

		// check fields
		if (isEmpty(email) || isEmpty(password))
			return toast.error('Please fill in all fields.', {
				className: 'toast-failed',
				pauseOnHover: false,
			})
		// check email format
		if (!isEmail(email))
			return toast.error('Please enter a valid email address.', {
				className: 'toast-failed',
				pauseOnHover: false,
			})
		// login
		try {
			const response = await axios.post('/api/auth/login', { email, password })
			toast.success(response.data.msg, {
				className: 'toast-success',
				pauseOnHover: false,
				autoClose: 3000,
			})
			// delay redirect
			setTimeout(() => {
				localStorage.setItem('_appSigngin', true)
				dispatch({ type: 'SIGNIN' })
				if (loaction.pathname !== '/') navigate('/')
			}, 3000)
		} catch (error) {
			toast.error(error.response.data.msg, {
				className: 'toast-failed',
				pauseOnHover: false,
			})
		}
	}

	return (
		<>
			<ToastContainer />
			<div className="login">
				<div className="title">
					<span>login</span>
				</div>
				<form onSubmit={login}>
					<Input
						type="text"
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
						icon2={visible ? <EyeFillIcon size={16} /> : <EyeOffFillIcon size={16} />}
						handleIconClick={handleIconClick}
						handleChange={handleInputChange}
					/>
					<div className="login_btn">
						<button type="submit">login</button>
						<button type="button">
							signin with <GoogleFillIcon size={16} style={{ marginLeft: '4px' }} />
						</button>
					</div>
				</form>
				<div className="login_actions">
					<p
						className="forgot_password"
						onClick={() => {
							navigate('/forgot-password')
						}}
					>
						Forgot you password?
					</p>
					<div className="navigate">
						<p>Don't you have account?</p>
						<button
							onClick={() => {
								navigate('/register')
							}}
						>
							Register now
						</button>
					</div>
				</div>
			</div>
		</>
	)
}

export default Login
