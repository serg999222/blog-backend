// import { body } from 'express-validator'
const { body } = require('express-validator')

module.exports.loginValidation = [
	body('email', 'Невірний формат пошти').isEmail(),
	body('password', 'Пароль має бути мінімум 5 символів').isLength({ min: 5 }),

]

module.exports.registerValidation = [
	body('email', 'Невірний формат пошти').isEmail(),
	body('password', 'Пароль має бути мінімум 5 символів').isLength({ min: 5 }),
	body('fullName', "Вкажіть прізвище та ім'я").isLength({ min: 3 }),
	body('avatarUrl', "Невірне посилання на аватарку ").optional().isURL()
]

module.exports.postCreateValidation = [
	body('title', 'Введіть заголовок статті').isLength({ min: 3 }),
	body('text', 'Введіть текст статті').isLength({ min: 5 }),
	body('tags', "Невірний формат тегу").optional().isString(),
	body('imageUrl', "Невірне посилання на зображення ").optional().isString()
]