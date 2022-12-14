// import mongoose from "mongoose"
const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	text: {
		type: String,
		required: true,
		unique: true
	},
	tags: {
		type: Array,
		default: []
	},
	viewsCount: {
		type: Number,
		default: 0
	},

	imageUrl: String,

	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		require: true
	}

},
	{
		timestamps: true,
	},
)

module.exports.PostModel = mongoose.model('Post', PostSchema)