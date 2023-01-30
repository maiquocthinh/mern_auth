import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../Login/Login.scss'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { axiosClient as axios } from '../../helpers'

const Login = () => {
	const navigate = useNavigate()
	const [isActived, setIsActived] = useState(false)
	const { activation_token } = useParams()

	const handleActive = async () => {
		try {
			// check activation token
			if (activation_token) {
				const response = await axios.post('/api/auth/activation', { activation_token })
				toast.success(response.data.msg, {
					className: 'toast-success',
					pauseOnHover: false,
				})
				setIsActived(true)
			}
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
					<span>activate account</span>
				</div>
				{isActived && (
					<div className="login_actions">
						<div className="navigate">
							<p>Account has been activated.</p>
							<button
								onClick={() => {
									navigate('/login')
								}}
							>
								Login Now
							</button>
						</div>
					</div>
				)}
				{!isActived && (
					<div className="login_btn">
						<button onClick={handleActive}>Active</button>
					</div>
				)}
			</div>
		</>
	)
}

export default Login
