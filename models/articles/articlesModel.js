const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './../config.env' });

const articlesSchema = new mongoose.Schema(
	{
		originalArticleID: {
			type: String,
			unique: true,
		},
		authorName: {
			type: String,
			default: null,
		},
		articleCreatedDate: {
			type: Date,
			required: [true, 'Article created date is required!'],
		},
		articleTitle: {
			type: String,
			unique: true,
		},
		articleImageURL: {
			type: String,
		},
		articleType: {
			type: String,
			default: 'Article',
			enum: ['Article', 'InternVideo', 'YoutubeVideo'],
		},
		videoLink: {
			type: String,
			default: null,
		},
		categoryName: {
			type: String,
		},
		mediaName: {
			type: String,
		},
		mediaLogo: {
			type: String,
			default: 'nologo.png',
		},
		articleLanguage: {
			type: String,
			enum: ['ar', 'en', 'es', 'fr'],
		},
		articleSourceLink: {
			type: String,
		},
		articleDescription: {
			type: String,
		},
		articleCleanDescription: {
			type: String,
			default:null
		},
	},

	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

const articlesModel = mongoose.model('articlesModel', articlesSchema);

module.exports = articlesModel;
