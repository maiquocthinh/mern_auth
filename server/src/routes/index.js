const userRoutes = require('./user.routes.js')
const uploadRoutes = require('./upload.routes.js')

const useRoutes = (app) => {
	app.use(userRoutes)
	app.use(uploadRoutes)
}

module.exports = useRoutes
