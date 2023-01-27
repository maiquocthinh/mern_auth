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

const Register = () => {
	const [visible, setVisible] = useState(false)
	const navigate = useNavigate()

	const handleIconClick = () => {
		setVisible(!visible)
	}

	return (
		<div className="login">
			<div className="title">
				<span>register</span>
			</div>
			<from>
				<Input type="email" name="name" text="Name" icon={<User3LineIcon size={16} />} />
				<Input type="text" name="email" text="Email" icon={<MailLineIcon size={16} />} />
				<Input
					type={visible ? 'text' : 'password'}
					name="password"
					text="Password"
					icon={<LockPasswordLineIcon size={16} />}
					icon2={visible ? <EyeLineIcon size={16} /> : <EyeOffLineIcon size={16} />}
					handleIconClick={handleIconClick}
				/>
				<Input
					type={visible ? 'text' : 'password'}
					name="confirmPassword"
					text="Confirm Password"
					icon={<LockPasswordLineIcon size={16} />}
					icon2={visible ? <EyeLineIcon size={16} /> : <EyeOffLineIcon size={16} />}
					handleIconClick={handleIconClick}
				/>
			</from>
			<div className="login_btn">
				<button>register</button>
				<button>
					signin with <GoogleFillIcon size={16} style={{ marginLeft: '4px' }} />
				</button>
			</div>
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
	)
}

export default Register
