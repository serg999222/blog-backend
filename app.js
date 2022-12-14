const express = require('express')
const UserController = require('./controllers/UserController.js')
const PostController = require('./controllers/PostController.js')
// import * as UserController from './controllers/UserController.js'
// import * as PostController from './controllers/PostController.js'
// import mongoose from 'mongoose'
const mongoose = require('mongoose')
// import { registerValidation, loginValidation, postCreateValidation } from './validations.js'
const { registerValidation, loginValidation, postCreateValidation } = require('./validations.js')
// import checkAuth from './utils/checkAuth.js'
const checkAuth = require('./utils/checkAuth.js')
// import multer from 'multer'
const multer = require('multer')
// import { handleValidationResult } from './utils/handleValidationResult.js'
const { handleValidationResult } = require('./utils/handleValidationResult.js')
// import cors from 'cors'
const cors = require('cors')


const PORT = process.env.PORT || 4444

mongoose.connect('mongodb+srv://admin:wwwww@cluster0.kvojw2y.mongodb.net/blog?retryWrites=true&w=majority')
	.then(() => console.log('DB ok'))
	.catch((err) => console.log('db error', err))

const app = express()

const storage = multer.diskStorage({
	destination: (_, __, cb) => {
		cb(null, 'uploads')
	},
	filename: (_, file, cb) => {
		cb(null, file.originalname)
	}
})

const upload = multer({ storage })
app.use('/uploads', express.static('uploads'))
app.use(cors())
app.use(express.json())


app.post('/auth/login', loginValidation, handleValidationResult, UserController.login)
app.post('/auth/register', registerValidation, handleValidationResult, UserController.register)
app.get('/auth/me', checkAuth, UserController.getMe)

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
	res.json({
		url: `/uploads/${req.file.originalname}`
	})
})

app.post('/posts', checkAuth, postCreateValidation, handleValidationResult, PostController.create)
app.get('/posts/:id', PostController.getOne)

app.get('/posts', PostController.getAll)

app.get('/tags', PostController.getLastTags)
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationResult, PostController.update)
app.delete('/posts/:id', checkAuth, PostController.remove)

app.listen(PORT, (err) => {
	if (err) {
		return console.log(err)
	}
	console.log('Everytink good')
})





















