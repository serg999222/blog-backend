// import jwt from 'jsonwebtoken'
// import bcrypt from 'bcrypt'
// import { validationResult } from 'express-validator'
// import UserModel from '../models/User.js'
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const validationResult = require('express-validator')
const { UserModel } = require('../models/User.js')



module.exports.login = async (req, res) => {
	try {

		const user = await UserModel.findOne({ email: req.body.email })
		if (!user) {
			return res.status(404).json({
				massage: 'Користувача не знайдено'
			})
		}


		const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash)
		if (!isValidPass) {
			return res.status(400).json({
				massage: 'Не вірний логін або пароль'
			})
		}

		const token = jwt.sign({
			_id: user._id
		}, 'secret123',
			{
				expiresIn: '30d'
			})

		const { passwordHash, ...userData } = user._doc
		res.json({
			...userData,
			token
		})

	} catch (err) {
		console.log(err)
		res.status(500).json({
			massage: 'Не вийшло авторизуватися'
		})
	}

}

module.exports.register = async (req, res) => {
	try {


		const password = req.body.password
		const salt = await bcrypt.genSalt(10)
		const hash = await bcrypt.hash(password, salt)

		const doc = new UserModel({
			email: req.body.email,
			fullName: req.body.fullName,
			avatarUrl: req.body.avatarUrl,
			passwordHash: hash
		})

		const user = await doc.save()

		const token = jwt.sign({
			_id: user._id
		}, 'secret123',
			{
				expiresIn: '30d'
			})

		const { passwordHash, ...userData } = user._doc

		res.json({
			...userData,
			token
		})
	} catch (err) {
		console.log(err)
		res.status(500).json({
			massage: 'Не вийшло зареєструвати користувача'
		})
	}

}

module.exports.getMe = async (req, res) => {
	try {
		const user = await UserModel.findById(req.userId)
		if (!user) {
			return res.status(404).json({
				massage: 'Користувача не знайдено'
			})
		}
		const { passwordHash, ...userData } = user._doc

		res.json(userData)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			massage: 'Відсутній доступ'
		})
	}
}