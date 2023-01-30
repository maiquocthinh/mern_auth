import { useState } from 'react'
import Input from '../Input'
import '../Login/Login.scss'
import MailLineIcon from 'remixicon-react/MailLineIcon'
import { isEmail, isEmpty } from '../../helpers'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { axiosClient as axios } from '../../helpers'

const Login = () => {
	const [email, setEmail] = useState('')

	const handleChange = (e) => {
		setEmail(e.target.value)
	}

	const clearInput = () => {
		document.querySelectorAll('input').forEach((el) => (el.value = ''))
		setEmail('')
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		// check email empty
		if (isEmpty(email))
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
		// forgot
		try {
			const response = await axios.post('/api/auth/forgot_password', { email })
			toast.success(response.data.msg, {
				className: 'toast-success',
				pauseOnHover: false,
			})
			clearInput()
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
					<span>forgot password</span>
				</div>
				<form onSubmit={handleSubmit}>
					<Input
						type="text"
						name="Email"
						text="Email"
						icon={<MailLineIcon size={16} />}
						handleChange={handleChange}
					/>
					<div className="login_btn">
						<button type="submit">Send</button>
					</div>
				</form>
			</div>
		</>
	)
}

export default Login
