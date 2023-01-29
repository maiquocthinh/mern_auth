import { useContext } from 'react'
import { AuthContext } from './AuthContext'

export const useAuthStore = () => {
	const { userInfo, isLoggedIn, accessToken, dispatch } = useContext(AuthContext)
	return { userInfo, isLoggedIn, accessToken, dispatch }
}
