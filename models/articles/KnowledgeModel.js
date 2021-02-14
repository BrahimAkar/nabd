const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './../config.env' });

const KnowledgeArticleShema = new mongoose.Schema(
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

const KnowledgeArticle = mongoose.model('KnowledgeArticle', KnowledgeArticleShema);

module.exports = KnowledgeArticle;
