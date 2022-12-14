// import jwt from 'jsonwebtoken'
const jwt = require('jsonwebtoken')

module.exports = function checkAuth(req, res, next) {
	const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

	if (token) {
		try {
			const decoded = jwt.verify(token, 'secret123')

			req.userId = decoded._id
			next()
		} catch (e) {
			return res.status(403).json({
				massage: 'Відсутній доступ'
			})
		}
	} else {
		return res.status(403).json({
			massage: 'Відсутній доступ'
		})
	}

}