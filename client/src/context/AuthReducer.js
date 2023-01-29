const AuthReducer = (state, action) => {
	switch (action.type) {
		case 'SIGNIN':
			return {
				...state,
				isLoggedIn: true,
			}
		case 'SET_ACCESS_TOKEN':
			return {
				...state,
				accessToken: action.payload,
			}
		case 'SET_USER_INFO':
			return {
				...state,
				userInfo: action.payload,
			}
		case 'UPDATE_USER_AVATAR':
			return {
				...state,
				userInfo: { ...state.userInfo, avatar: action.payload },
			}
		case 'SIGNOUT':
			return {
				...state,
				isLoggedIn: false,
			}
		default:
			throw new Error('Invalid Action.')
	}
}

export default AuthReducer
