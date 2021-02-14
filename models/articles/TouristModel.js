const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './../config.env' });

const TouristArticleShema = new mongoose.Schema(
	{
		originalNabdArticleID: {
			type: String,
			unique: true,
		},
		dateScraped: {
			type: Date,
			default: new Date(),
		},
		title: {
			type: String,
			unique: true,
		},
		link: {
			type: String,
			unique: true,
		},
		image: {
			type: String,
		},
		category: {
			type: String,
		},
		sourceLink: {
			type: String,
		},
		description: {
			type: String,
		},
		type: {
			type: String,
			enum: ['article', 'video'],
		},
	},

	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

const TouristArticle = mongoose.model('TouristArticle', TouristArticleShema);

module.exports = TouristArticle;
