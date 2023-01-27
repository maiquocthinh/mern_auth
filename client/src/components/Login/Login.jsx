import { useState } from 'react'
import Input from '../../components/Input'
import './Login.scss'
import MailLineIcon from 'remixicon-react/MailLineIcon'
import LockPasswordLineIcon from 'remixicon-react/LockPasswordLineIcon'
import GoogleFillIcon from 'remixicon-react/GoogleFillIcon'
import EyeFillIcon from 'remixicon-react/EyeFillIcon'
import EyeOffFillIcon from 'remixicon-react/EyeOffFillIcon'
import { useNavigate } from 'react-router-dom'

const Login = () => {
	const [visible, setVisible] = useState(false)
	const navigate = useNavigate()

	const handleIconClick = () => {
		setVisible(!visible)
	}

	return (
		<div className="login">
			<div className="title">
				<span>login</span>
			</div>
			<from>
				<Input type="email" name="Email" text="Email" icon={<MailLineIcon size={16} />} />
				<Input
					type={visible ? 'text' : 'password'}
					name="password"
					text="Password"
					icon={<LockPasswordLineIcon size={16} />}
					icon2={visible ? <EyeFillIcon size={16} /> : <EyeOffFillIcon size={16} />}
					handleIconClick={handleIconClick}
				/>
			</from>
			<div className="login_btn">
				<button>login</button>
				<button>
					signin with <GoogleFillIcon size={16} style={{ marginLeft: '4px' }} />
				</button>
			</div>
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
	)
}

export default Login
