import { body } from 'express-validator'

export const loginValidation = [
	body('email', 'Невірний формат пошти').isEmail(),
	body('password', 'Пароль має бути мінімум 5 символів').isLength({ min: 5 }),

]

export const registerValidation = [
	body('email', 'Невірний формат пошти').isEmail(),
	body('password', 'Пароль має бути мінімум 5 символів').isLength({ min: 5 }),
	body('fullName', "Вкажіть прізвище та ім'я").isLength({ min: 3 }),
	body('avatarUrl', "Невірне посилання на аватарку ").optional().isURL()
]

export const postCreateValidation = [
	body('title', 'Введіть заголовок статті').isLength({ min: 3 }),
	body('text', 'Введіть текст статті').isLength({ min: 5 }),
	body('tags', "Невірний формат тегу").optional().isArray(),
	body('imageUrl', "Невірне посилання на зображення ").optional().isString()
]