import { createContext, useReducer } from 'react'
import AuthReducer from './AuthReducer'

const INITIAL_STATE = {
	userInfo: {},
	isLoggedIn: false,
	accessToken: '',
}

export const AuthContext = createContext(INITIAL_STATE)

export const AuthProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

	return (
		<AuthContext.Provider
			value={{ userInfo: state.userInfo, isLoggedIn: state.isLoggedIn, accessToken: state.accessToken, dispatch }}
		>
			{children}
		</AuthContext.Provider>
	)
}
