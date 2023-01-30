import './ProfileLayout.scss'
import Menu2FillIcon from 'remixicon-react/Menu2FillIcon'
import ArticleLineIcon from 'remixicon-react/ArticleLineIcon'
import User3LineIcon from 'remixicon-react/User3LineIcon'
import LogoutBoxLineIcon from 'remixicon-react/LogoutBoxLineIcon'
import Input from '../../components/Input'
import MailLineIcon from 'remixicon-react/MailLineIcon'
import LockPasswordLineIcon from 'remixicon-react/LockPasswordLineIcon'
import EyeLineIcon from 'remixicon-react/EyeLineIcon'
import EyeOffLineIcon from 'remixicon-react/EyeOffLineIcon'
import Upload2FillIcon from 'remixicon-react/Upload2FillIcon'
import { useState } from 'react'
import { useAuthStore } from '../../context/AuthHooks'
import { useNavigate } from 'react-router-dom'
import { axiosClient as axios } from '../../helpers'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { isEmpty, isLengthNotEnough, isMatch } from '../../helpers'

const ProfileLayout = () => {
	const [sidebarVisible, setSidebarVisible] = useState(false)
	const [visiblePass, setVisiblePass] = useState(false)
	const [avatarFile, setAvatarFile] = useState()
	const { userInfo, accessToken, dispatch } = useAuthStore()
	const navigate = useNavigate()
	const initDataState = { name: userInfo.name, password: '', cf_password: '' }
	const [data, setData] = useState(initDataState)
	const { name, password, cf_password } = data

	const handleIconClick = () => {
		setVisiblePass(!visiblePass)
	}

	const handleSidebarVisible = () => {
		setSidebarVisible(!sidebarVisible)
	}

	const handleLogout = () => {
		localStorage.removeItem('_appSigngin')
		dispatch({ type: 'SIGNOUT' })
		navigate('/login')
	}

	const handleChangeAvatar = (e) => {
		e.preventDefault()
		const file = e.target.files[0]
		setAvatarFile(file)
		URL.revokeObjectURL(userInfo.avatar)
		dispatch({ type: 'UPDATE_USER_AVATAR', payload: URL.createObjectURL(file) })

		// const formData = new FormData()
		// formData.append('avatar', file)

		/* try {
			const response = await toast.promise(
				axios.post('/api/upload', formData, {
					headers: { 'Content-Type': 'multipart/form-data', Authorization: accessToken },
				}),
				{
					pending: 'Uploading....',
					success: 'Change avatar successfully.',
					error: 'Change avatar failedly.',
				},
				{
					pauseOnHover: false,
				},
			)
			dispatch({ type: 'UPDATE_USER_AVATAR', payload: response.data.url })
		} catch (error) {
			toast.error(error.response.data.msg, {
				className: 'toast-failed',
				pauseOnHover: false,
			})
		} */
	}

	const handleInputChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value })
	}

	const updateInfo = async () => {
		let newAvatar = ''
		// upload avatar
		if (avatarFile) {
			const formData = new FormData()
			formData.append('avatar', avatarFile)
			formData.append('cloudinary', true)
			try {
				const response = await toast.promise(
					axios.post('/api/upload', formData, {
						headers: { 'Content-Type': 'multipart/form-data', Authorization: accessToken },
					}),
					{
						pending: {
							render: () => 'Uploading...',
							className: 'toast-pending',
						},
						success: {
							render: () => 'Upload image successfully.',
							className: 'toast-success',
						},
					},
					{ pauseOnHover: false },
				)
				newAvatar = response.data.url
				setAvatarFile(null)
			} catch (error) {
				toast.error(error.response.data.msg, {
					className: 'toast-failed',
					pauseOnHover: false,
				})
			}
		}
		// update info
		if (name !== userInfo.name || newAvatar) {
			// check name field
			if (isEmpty(name))
				return toast.error('Please fill in name field.', {
					className: 'toast-failed',
					pauseOnHover: false,
				})
			try {
				const response = await axios.patch(
					'/api/auth/user_update',
					{ name: name || userInfo.name, avatar: newAvatar || userInfo.avatar },
					{ headers: { Authorization: accessToken } },
				)
				const updatedUser = await axios.get('/api/auth/user', { headers: { Authorization: accessToken } })
				dispatch({ type: 'SET_USER_INFO', payload: updatedUser.data.user })
				toast.success(response.data.msg, {
					className: 'toast-success',
					pauseOnHover: false,
				})
			} catch (error) {
				toast.error(error.response.data.msg, {
					className: 'toast-failed',
					pauseOnHover: false,
				})
			}
		}
	}
	const updatePassword = async () => {
		console.log('here')
		// check password length
		if (isLengthNotEnough(password))
			return toast.error('Password must be at least 6 characters.', {
				className: 'toast-failed',
				pauseOnHover: false,
			})
		// check password match
		if (!isMatch(password, cf_password))
			return toast.error('Password did not match.', {
				className: 'toast-failed',
				pauseOnHover: false,
			})
		try {
			const response = await axios.post(
				'/api/auth/reset_password',
				{ password },
				{ headers: { Authorization: accessToken } },
			)
			toast.success(response.data.msg, {
				className: 'toast-success',
				pauseOnHover: false,
			})
		} catch (error) {
			toast.error(error.response.data.msg, {
				className: 'toast-failed',
				pauseOnHover: false,
			})
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		if (name || avatarFile) updateInfo()
		if (password) updatePassword()
		setData(initDataState)
	}

	return (
		<div className="profilelayout">
			<ToastContainer />
			{/* appbar */}
			<div className="profilelayout_appbar">
				<div className="appbar_wrapper">
					<div className="appbar_logo">
						<img src="https://cdn-icons-png.flaticon.com/512/7792/7792166.png" alt="logo" />
						<p>MernAuth</p>
					</div>
					<div className="appbar_avatar">
						<div className="appbar_avatar__box">
							<img src={userInfo.avatar} alt="avatar" />
						</div>
						<Menu2FillIcon onClick={handleSidebarVisible} />
					</div>
				</div>
			</div>
			{/* sidebar */}
			<div className={`profilelayout_sidebar ${sidebarVisible ? 'open' : ''}`}>
				<div className="sidebar_menu">
					<ul>
						<li>
							<ArticleLineIcon size={20} />
							<p>feed</p>
						</li>
						<li>
							<User3LineIcon size={20} />
							<p>profile</p>
						</li>
						<li onClick={handleLogout}>
							<LogoutBoxLineIcon size={20} />
							<p>logout</p>
						</li>
					</ul>
				</div>
			</div>
			{/* content */}
			<div className="profilelayout_content">
				<div className="profilelayout_content__feed">
					<div className="feed">
						<div className="feed_date">
							<div className="appbar_avatar__box">
								<img src={userInfo.avatar} alt="avatar" />
							</div>
							<p>23/03/2013</p>
						</div>
						<div className="feed_img">
							<img src="https://source.unsplash.com/random/16:9" alt="feed_image" />
						</div>
						<div className="feed_content">
							<p>
								Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus rerum blanditiis a
								quibusdam? Dolorum labore praesentium eius tenetur inventore corrupti distinctio
								assumenda accusantium, officia consequatur?
							</p>
						</div>
					</div>
				</div>
				<div className="profilelayout_content__profile">
					<div className="profile_avatar">
						<div className="profile_avatar__child">
							<img src={userInfo.avatar} alt="avatar" />
						</div>
						<label htmlFor="avatar">
							<Upload2FillIcon size={80} />
						</label>
						<input type="file" accept="image/*" name="avatar" id="avatar" onChange={handleChangeAvatar} />
					</div>
					<form className="profile_input" onSubmit={handleSubmit}>
						<Input
							type="text"
							name="name"
							text="Name"
							icon={<User3LineIcon size={16} />}
							defaultValue={userInfo.name}
							handleChange={handleInputChange}
						/>
						<Input
							type="text"
							name="email"
							text="Email"
							disabled
							icon={<MailLineIcon size={16} />}
							defaultValue={userInfo.email}
						/>
						<Input
							type={visiblePass ? 'text' : 'password'}
							name="password"
							text="Password"
							icon={<LockPasswordLineIcon size={16} />}
							icon2={visiblePass ? <EyeLineIcon size={16} /> : <EyeOffLineIcon size={16} />}
							handleIconClick={handleIconClick}
							handleChange={handleInputChange}
						/>
						<Input
							type={visiblePass ? 'text' : 'password'}
							name="cf_password"
							text="Confirm Password"
							icon={<LockPasswordLineIcon size={16} />}
							icon2={visiblePass ? <EyeLineIcon size={16} /> : <EyeOffLineIcon size={16} />}
							handleIconClick={handleIconClick}
							handleChange={handleInputChange}
						/>
						<button>Update</button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default ProfileLayout
