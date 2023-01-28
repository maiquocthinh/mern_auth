import { BrowserRouter, Routes, Route } from 'react-router-dom'

import AuthLayout from './Layouts/AuthLayout'
import ProfileLayout from './Layouts/ProfileLayout'
import Login from './components/Login'
import Register from './components/Register'
import ForgotPass from './components/ForgotPass'
import ResetPass from './components/ResetPass'
import Activate from './components/Activate'

import './assets/scss/main.scss'

const App = () => {
	const isLogined = !false

	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={
						isLogined ? (
							<ProfileLayout />
						) : (
							<AuthLayout>
								<Login />
							</AuthLayout>
						)
					}
				/>
				<Route
					path="/login"
					element={
						<AuthLayout>
							<Login />
						</AuthLayout>
					}
				/>
				<Route
					path="/register"
					element={
						<AuthLayout>
							<Register />
						</AuthLayout>
					}
				/>
				<Route
					path="/forgot-password"
					element={
						<AuthLayout>
							<ForgotPass />
						</AuthLayout>
					}
				/>
				<Route
					path="/reset-password/:token"
					element={
						<AuthLayout>
							<ResetPass />
						</AuthLayout>
					}
				/>
				<Route
					path="/api/auth/activate/:activation_token"
					element={
						<AuthLayout>
							<Activate />
						</AuthLayout>
					}
				/>
			</Routes>
		</BrowserRouter>
	)
}

export default App
