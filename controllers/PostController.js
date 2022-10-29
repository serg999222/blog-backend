// import PostModel from '../models/Post.js'
const { PostModel } = require('../models/Post')


module.exports.getLastTags = async (req, res) => {
	try {
		const posts = await PostModel.find().limit(5).exec()
		const tags = posts.map(obj => obj.tags).flat().slice(0.5)
		res.json(tags)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			massage: 'Не вийшло завантажити тег'
		})
	}
}

module.exports.getAll = async (req, res) => {
	try {
		const posts = await PostModel.find().populate('user').exec()

		res.json(posts)

	} catch (err) {
		console.log(err)
		res.status(500).json({
			massage: 'Не вийшло завантажити пости'
		})
	}

}

module.exports.getOne = async (req, res) => {
	try {

		const postId = req.params.id

		PostModel.findOneAndUpdate(
			{
				_id: postId
			},
			{
				$inc: { viewsCount: 1 }
			},
			{
				returnDocument: 'after',
			},
			(err, doc) => {
				if (err) {
					console.log(err)
					return res.status(500).json({
						massage: 'Не вийшло завантажити пост'
					})
				}
				if (!doc) {
					return res.status(404).json({
						massage: 'Пост не знайдено'
					})
				}

				res.json(doc)

			}
		).populate('user')


	} catch (err) {
		console.log(err)
		res.status(500).json({
			massage: 'Не вийшло завантажити пости'
		})
	}

}

module.exports.remove = async (req, res) => {
	try {

		const postId = req.params.id

		PostModel.findOneAndDelete(
			{
				_id: postId
			},
			(err, doc) => {
				if (err) {
					console.log(err)
					return res.status(403).json({
						massage: 'Не вийшло видалити пост'
					})
				}
				if (!doc) {
					return res.status(404).json({
						massage: 'Пост не знайдено'
					})
				}


				res.json({
					massage: "Пост видалено"
				})
			})


	} catch (err) {
		console.log(err)
		res.status(500).json({
			massage: 'Не вийшло видалити пост'
		})
	}

}

module.exports.create = async (req, res) => {
	try {


		const doc = new PostModel({
			title: req.body.title,
			text: req.body.text,
			tags: req.body.tags.split(','),
			imageUrl: req.body.imageUrl,
			user: req.userId,
		})


		const post = await doc.save()

		res.json(post)

	} catch (err) {
		console.log(err)
		res.status(500).json({
			massage: 'Не вийшло додати пост'
		})
	}
}

module.exports.update = async (req, res) => {
	try {

		const postId = req.params.id

		await PostModel.findOneAndUpdate(
			{
				_id: postId
			},
			{
				title: req.body.title,
				text: req.body.text,
				tags: req.body.tags.split(','),
				imageUrl: req.body.imageUrl,
				user: req.userId,
			})

		res.json({
			succes: true
		})

	} catch (err) {
		console.log(err)
		res.status(500).json({
			massage: 'Не вийшло обновити пост'
		})
	}
}

