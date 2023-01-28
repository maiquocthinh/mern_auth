const { Router } = require('express')
const { auth, applyMulter, uploadImage } = require('../middlewares')
const route = Router()
const uploadController = require('../controllers/upload.controller.js')

route.post('/api/upload', applyMulter, uploadImage, auth, uploadController.uploadAvatar)

module.exports = route
