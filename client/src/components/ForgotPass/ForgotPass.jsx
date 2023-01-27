import Input from '../Input'
import '../Login/Login.scss'
import MailLineIcon from 'remixicon-react/MailLineIcon'

const Login = () => {
	return (
		<div className="login">
			<div className="title">
				<span>forgot password</span>
			</div>
			<from>
				<Input type="email" name="Email" text="Email" icon={<MailLineIcon size={16} />} />
			</from>
			<div className="login_btn">
				<button>Send</button>
			</div>
		</div>
	)
}

export default Login
