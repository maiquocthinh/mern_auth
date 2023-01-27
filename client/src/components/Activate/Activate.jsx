import '../Login/Login.scss'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Login = () => {
	const navigate = useNavigate()
	const [isActived, setIsActived] = useState(false)

	const handleActive = () => {
		// do active...
		setIsActived(true)
	}

	return (
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
	)
}

export default Login
