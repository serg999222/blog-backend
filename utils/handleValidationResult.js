// import { validationResult } from "express-validator"
const { validationResult } = require('express-validator')

module.exports.handleValidationResult = (req, res, next) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json(errors.array())
	}

	next()
}
