import Input from '../Input'
import '../Login/Login.scss'
import LockPasswordLineIcon from 'remixicon-react/LockPasswordLineIcon'
import EyeFillIcon from 'remixicon-react/EyeFillIcon'
import EyeOffFillIcon from 'remixicon-react/EyeOffFillIcon'
import { useState } from 'react'
import { isEmpty, isLengthNotEnough, isMatch } from '../../helpers'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { axiosClient as axios } from '../../helpers'
import { useNavigate, useParams } from 'react-router-dom'

const Login = () => {
	const [visible, setVisible] = useState(false)
	const navigate = useNavigate()
	const [data, setData] = useState({ password: '', cf_password: '' })
	const { password, cf_password } = data
	const { token } = useParams()

	const handleIconClick = () => {
		setVisible(!visible)
	}

	const handleInputChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value })
	}
	console.log({ password, cf_password })
	const clearInput = () => {
		document.querySelectorAll('input').forEach((el) => (el.value = ''))
		setData({ password: '', cf_password: '' })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		// check fields
		if (isEmpty(password) || isEmpty(cf_password))
			return toast.error('Please fill in all fields.', {
				className: 'toast-failed',
				pauseOnHover: false,
			})
		// check password length
		if (isLengthNotEnough(password))
			return toast.error('Password must be at least 6 characters.', {
				className: 'toast-failed',
				pauseOnHover: false,
			})
		// check confirm password is match with password
		if (!isMatch(password, cf_password))
			return toast.error('Password did not match.', {
				className: 'toast-failed',
				pauseOnHover: false,
			})

		// reset password
		try {
			const response = await axios.post(
				'/api/auth/reset_password',
				{ password },
				{ headers: { Authorization: token } },
			)
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
					<span>reset password</span>
				</div>
				<form onSubmit={handleSubmit}>
					<Input
						type={visible ? 'text' : 'password'}
						name="password"
						text="Password"
						icon={<LockPasswordLineIcon size={16} />}
						icon2={visible ? <EyeFillIcon size={16} /> : <EyeOffFillIcon size={16} />}
						handleIconClick={handleIconClick}
						handleChange={handleInputChange}
					/>
					<Input
						type={visible ? 'text' : 'password'}
						name="cf_password"
						text="Confirm Password"
						icon={<LockPasswordLineIcon size={16} />}
						icon2={visible ? <EyeFillIcon size={16} /> : <EyeOffFillIcon size={16} />}
						handleIconClick={handleIconClick}
						handleChange={handleInputChange}
					/>
					<div className="login_btn">
						<button type="submit">Reset</button>
					</div>
				</form>
				<div className="login_actions">
					<div className="navigate">
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

export default Login
