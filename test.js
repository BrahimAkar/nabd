const axios = require('axios');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const preEconomyArticle = require('./models/preEconomyModel');
const FormData = require('form-data');
const form = new FormData();

// Importing Modules
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Setting Environmental Variables
dotenv.config({ path: './config.env' });

// Connecting MongoDB
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose
	.connect(DB, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.then(() => {
		console.log('Database connected');
	});

const run = async () => {
	const latest = await preEconomyArticle.find().limit(1).sort({ $natural: -1 });
	console.log(latest);
	const latestID = latest[0].originalNabdArticleID.split('-')[0];

	form.append('last_article_id', latestID);
	form.append('category_id', '1');
	form.append('offset_index', '100');
	form.append('h', '1388b4');

	axios
		.post('https://nabd.com/load_more_category_stories.php', form, {
			headers: form.getHeaders(),
		})
		.then(async (result) => {
			try {
				const dom = new JSDOM(result.data);
				let full = dom.window.document.querySelectorAll('.regular-story');
				let all = [];
				for (i = 0; i < full.length; i++) {
					try {
						let title = full[i].children[0].children[0].children[0].getAttribute('title');
						let image = full[i].children[1].children[0].children[0].getAttribute('data-src');
						let link = full[i].children[0].children[0].children[0].getAttribute('href');
						let originalNabdArticleID = link.split('/s/')[1].split('/')[0];
						let category = full[i].children[0].children[1].children[0].textContent;
						all.push({ title, image, link, category, originalNabdArticleID });
					} catch (error) {
						console.log(error.message);
					}
				}

				try {
					await preEconomyArticle.insertMany(all, { ordered: false });
				} catch (error) {
					console.log(error.message);
				}
			} catch (error) {
				console.error(error);
			}
		});
	// axios
	// 	.get('https://nabd.com/category/1-1388b4')
	// 	.then(async function (response) {})
	// 	.catch(function (error) {
	// 		// handle error
	// 		console.log(error);
	// 	})
	// 	.then(function () {
	// 		// always executed
	// 	});
};

// run();

const test2 = async () => {
	const latest = await preEconomyArticle.find().limit(1).sort({ $natural: 1 });
	console.log(latest);
	const latestID = latest[0].originalNabdArticleID.split('-')[0];
	console.log(latestID);
};

const getTheLatest = async () => {};

run();

// test2();
