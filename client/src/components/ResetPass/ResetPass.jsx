import Input from '../Input'
import '../Login/Login.scss'
import LockPasswordLineIcon from 'remixicon-react/LockPasswordLineIcon'
import EyeFillIcon from 'remixicon-react/EyeFillIcon'
import EyeOffFillIcon from 'remixicon-react/EyeOffFillIcon'
import { useState } from 'react'

const Login = () => {
	const [visible, setVisible] = useState(false)

	const handleIconClick = () => {
		setVisible(!visible)
	}

	return (
		<div className="login">
			<div className="title">
				<span>reset password</span>
			</div>
			<from>
				<Input
					type={visible ? 'text' : 'password'}
					name="password"
					text="Password"
					icon={<LockPasswordLineIcon size={16} />}
					icon2={visible ? <EyeFillIcon size={16} /> : <EyeOffFillIcon size={16} />}
					handleIconClick={handleIconClick}
				/>
				<Input
					type={visible ? 'text' : 'password'}
					name="confirmPassword"
					text="Confirm Password"
					icon={<LockPasswordLineIcon size={16} />}
					icon2={visible ? <EyeFillIcon size={16} /> : <EyeOffFillIcon size={16} />}
					handleIconClick={handleIconClick}
				/>
			</from>
			<div className="login_btn">
				<button>Reset</button>
			</div>
		</div>
	)
}

export default Login
