const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './../config.env' });

const preCookingArticleShema = new mongoose.Schema(
	{
		originalArticleID: {
			type: String,
			unique: true,
		},
		articleCreatedDate: {
			type: Date,
			default: new Date(),
		},
		articleTitle: {
			type: String,
			unique: true,
		},
		articleNabdLink: {
			type: String,
			unique: true,
		},
		articleImageURL: {
			type: String,
		},
		mediaName: {
			type: String,
		},
	},

	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

const preCookingArticle = mongoose.model('preCookingArticle', preCookingArticleShema);

module.exports = preCookingArticle;
