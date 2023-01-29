const { Router } = require('express')
const { auth } = require('../middlewares')
const route = Router()

const userController = require('../controllers/user.controller.js')

route.post('/api/auth/register', userController.register)
route.post('/api/auth/activation', userController.activate)
route.post('/api/auth/login', userController.login)
route.post('/api/auth/access', userController.access)
route.post('/api/auth/forgot_password', userController.forgot)
route.post('/api/auth/reset_password', auth, userController.reset)
route.get('/api/auth/user', auth, userController.info)
route.patch('/api/auth/user_update', auth, userController.update)
route.get('/api/auth/logout', userController.logout)
route.post('/api/auth/google_signin', userController.googleSignin)

module.exports = route
