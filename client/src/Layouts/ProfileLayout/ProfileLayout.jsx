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

const ProfileLayout = () => {
	const [sidebarVisible, setSidebarVisible] = useState(false)
	const [visiblePass, setVisiblePass] = useState(false)
	const { userInfo } = useAuthStore()

	const handleIconClick = () => {
		setVisiblePass(!visiblePass)
	}

	const handleSidebarVisible = () => {
		setSidebarVisible(!sidebarVisible)
	}

	return (
		<div className="profilelayout">
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
						<li>
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
							<img src="https://source.unsplash.com/random" alt="feed_image" />
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
						<input type="file" accept="image/*" name="avatar" id="avatar" />
					</div>
					<form className="profile_input">
						<Input
							type="text"
							name="name"
							text="Name"
							icon={<User3LineIcon size={16} />}
							defaultValue={userInfo.name}
						/>
						<Input
							type="text"
							name="email"
							text="Email"
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
						/>
						<Input
							type={visiblePass ? 'text' : 'password'}
							name="confirmPassword"
							text="Confirm Password"
							icon={<LockPasswordLineIcon size={16} />}
							icon2={visiblePass ? <EyeLineIcon size={16} /> : <EyeOffLineIcon size={16} />}
							handleIconClick={handleIconClick}
						/>
						<button>Update</button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default ProfileLayout
