import { BrowserRouter, Routes, Route } from 'react-router-dom'

import AuthLayout from './Layouts/AuthLayout'
import ProfileLayout from './Layouts/ProfileLayout'
import Login from './components/Login'
import Register from './components/Register'
import ForgotPass from './components/ForgotPass'
import ResetPass from './components/ResetPass'
import Activate from './components/Activate'

import './assets/scss/main.scss'
import { useAuthStore } from './context/AuthHooks'
import { useEffect } from 'react'
import axios from 'axios'

const App = () => {
	const { accessToken, isLoggedIn, dispatch } = useAuthStore()

	// get access token
	useEffect(() => {
		if (localStorage.getItem('_appSigngin')) {
			;(async () => {
				const response = await axios.post('/api/auth/access', null)
				dispatch({ type: 'SET_ACCESS_TOKEN', payload: response.data.access_token })
			})()
		}
	}, [dispatch, isLoggedIn])

	// get user info
	useEffect(() => {
		if (accessToken) {
			;(async () => {
				const response = await axios.get('/api/auth/user', {
					headers: { Authorization: accessToken },
				})
				dispatch({ type: 'SET_USER_INFO', payload: response.data.user })
			})()
		}
	}, [dispatch, accessToken])

	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={
						localStorage.getItem('_appSigngin') ? (
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
