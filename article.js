/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable no-loop-func */
/* eslint-disable no-undef */
const puppeteer = require('puppeteer-extra');
const shell = require('shelljs');
const axios = require('axios');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const fetch = require('node-fetch');
const Fs = require('fs');
const { createTask } = require('./functions/createTask');

var schedule = require('node-schedule');
//? Article model
const articlesModel = require('./models/articles/articlesModel');
//?
const { getTranslatedCategory } = require('./functions/getTranslatedCategory');

const preAlgeriaArticle = require('./models/preAlgeriaModel');
const preBahrainArticle = require('./models/preBahrainModel');
const preCarsArticle = require('./models/preCarsModel');
const preCookingArticle = require('./models/preCookingModel');
const preEconomyArticle = require('./models/preEconomyModel');
const preEgyptArticle = require('./models/preEgyptModel');
const preEmiratesArticle = require('./models/preEmiratesModel');
const preHealthArticle = require('./models/preHealthModel');
const preIraqArticle = require('./models/preIraqModel');
const preJordanArticle = require('./models/preJordanModel');
const preKnowledgeArticle = require('./models/preKnowledgeModel');
const preKuwaitArticle = require('./models/preKuwaitModel');
const preLebanonArticle = require('./models/preLebanonModel');
const preLibyaArticle = require('./models/preLibyaModel');
const preMoroccoArticle = require('./models/preMoroccoModel');
const preOmanArticle = require('./models/preOmanModel');
const prePalestineArticle = require('./models/prePalestineModel');
const preSaudiArabiaArticle = require('./models/preSaudiArabiaModel');
const preSportArticle = require('./models/preSportModel');
const preTechnologyArticle = require('./models/preTechnologyModel');
const preTouristArticle = require('./models/preTouristModel');
const preTunisiaArticle = require('./models/preTunisiaModel');
const preUrgentArticle = require('./models/preUrgentModel');
const preWomenArticle = require('./models/preWomenModel');
const preWorldArticle = require('./models/preWorldModel');
const preYemenArticle = require('./models/preYemenModel');

//! MODELS
const categories = require('./categories');

const {
	Morocco,
	Algeria,
	Bahrain,
	Tunisia,
	Tourist,
	Yemen,
	Iraq,
	Oman,
	Libya,
	Palestine,
	Jordan,
	Lebanon,
	Emirates,
	Egypt,
	SaudiArabia,
	Kuwait,
	Cooking,
	Knowledge,
	Women,
	Cars,
	Technology,
	Health,
	Economy,
	Sport,
	World,
	Urgent,
} = categories;

const allCategories = require('./categoriesIDs');

var puppeteerAutoscrollDown = require('puppeteer-autoscroll-down');
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
puppeteer.use(AdblockerPlugin());
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const task = require('./models/task');
dotenv.config({ path: './config.env' });

// Connecting MongoDB
const DB =
	'mongodb://brahim:brahim@cluster0-shard-00-00.0pvrw.mongodb.net:27017,cluster0-shard-00-01.0pvrw.mongodb.net:27017,cluster0-shard-00-02.0pvrw.mongodb.net:27017/preArticles?ssl=true&replicaSet=atlas-aft047-shard-0&authSource=admin&retryWrites=true&w=majority';
mongoose
	.connect(DB, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('Database connected');
	});

// const WPAPI = require('wpapi/superagent');
const categoriesIDs = require('./categoriesIDs');
// var wp = new WPAPI({
// 	endpoint: 'http://atlageek.com/?rest_route=/',
// 	username: 'brahimakar',
// 	password: '110220330',
// });

const scrapArticle = async (premodel, categoryID, modelName, taskId) => {
	const allLinks = await premodel.find();
	let currentStep = 0;
	await task.findByIdAndUpdate(taskId, {
		status: 'running',
		dateLaunched: Date.now(),
	});
	console.log('Number of links', allLinks.length);

	puppeteer
		.launch({ headless: true, args: ['--single-process', '--no-zygote', '--no-sandbox'] })
		.then(async (browser) => {
			const page = await browser.newPage();
			await page.bringToFront();
			await page.setViewport({ width: 1366, height: 768 });
			await page.setDefaultTimeout(120000);
			for (i = 0; i < allLinks.length; i++) {
				currentStep++;
				console.log(`Article N: ${i + 1}/${allLinks.length} of ${modelName}`);
				try {
					await page.goto(allLinks[i].articleNabdLink);
					await page.waitForTimeout(5000);
					const typeOfArticle = await checkTypeOfArticle(page);

					if (typeOfArticle === 'video') {
						// do somthing

						let videoType = await checkVideoType(page);
						const data = await page.evaluate(() => document.querySelector('*').outerHTML);
						const dom = new JSDOM(data);
						const mediaLogo = dom.window.document
							.querySelector('#nb-pub-details > a > img')
							.getAttribute('src');
						let videoLink;
						if (videoType === 'intern') {
							let videoLink = dom.window.document.querySelector('.play').getAttribute('href');
							await premodel.findByIdAndDelete({ _id: allLinks[i]._id });
							//! Wordpress Uncomment
							// try {
							// 	const response = await fetch(encodeURI(allLinks[i].articleImageURL));
							// 	const buffer = await response.buffer();
							// 	Fs.writeFileSync('./image.jpg', buffer);
							// } catch (error) {
							// 	console.log('Cant save image');
							// }

							const already2 = await articlesModel.find({
								originalArticleID: allLinks[i].originalArticleID,
							});

							if (already2.length > 0) {
								console.log('Already published');
							} else if (already2.length === 0) {
								const categoryTranslated = getTranslatedCategory(modelName);
								const htmlDescription = `<figure class="wp-block-video aligncenter"><video controls src="${videoLink}"></video></figure>`;
								await articlesModel
									.create({
										originalArticleID: allLinks[i].originalArticleID,
										articleCreatedDate: new Date(),
										articleType: 'InternVideo',
										videoLink: videoLink,
										articleLanguage: 'ar',
										articleTitle: allLinks[i].articleTitle,
										articleImageURL: allLinks[i].articleImageURL,
										articleDescription: htmlDescription,
										articleSourceLink: allLinks[i].articleNabdLink,
										authorName: null,

										categoryName: categoryTranslated,
										mediaName: allLinks[i].mediaName,
										mediaLogo: mediaLogo,
									})
									.then(async (res) => {
										//! WORDPRESS UNCOMMENT
										// let imageID;
										// const mediaCreated = await wp.media().file('./image.jpg').create({
										// 	title: allLinks[i].articleTitle,
										// 	alt_text: allLinks[i].articleTitle,
										// 	caption: allLinks[i].articleTitle,
										// 	description: allLinks[i].articleTitle,
										// });
										// imageID = mediaCreated.id;
										// const postCreated = await wp.posts().create({
										// 	title: allLinks[i].articleTitle,
										// 	content: htmlDescription,
										// 	status: 'publish',
										// 	media: imageID,
										// 	featured_media: imageID,
										// 	categories: [categoriesIDs[modelName]],
										// });
									})
									.catch((err) => console.log(err));
							}
						} else if (videoType === 'youtube') {
							console.log('Video Youtube');
							let fullYoutubeVideo = dom.window.document.querySelector('iframe').getAttribute('src');
							let youtubeVideo =
								'https://www.youtube.com/embed/' +
								fullYoutubeVideo.split('/embed/')[1].split('?autoplay=')[0];
							await premodel.findByIdAndDelete({ _id: allLinks[i]._id });

							//! Wordpress Uncomment
							// try {
							// 	const response = await fetch(encodeURI(allLinks[i].articleImageURL));
							// 	const buffer = await response.buffer();
							// 	Fs.writeFileSync('./image.jpg', buffer);
							// } catch (error) {
							// 	console.log('Cant save image');
							// }

							const already2 = await articlesModel.find({
								originalArticleID: allLinks[i].originalArticleID,
							});

							if (already2.length > 0) {
								console.log('Already published');
							} else if (already2.length === 0) {
								const categoryTranslated = getTranslatedCategory(modelName);

								const htmlDescription = `<iframe width="560" height="315" src="${youtubeVideo}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
								await articlesModel
									.create({
										originalArticleID: allLinks[i].originalArticleID,
										articleCreatedDate: new Date(),
										articleType: 'YoutubeVideo',
										videoLink: youtubeVideo,
										articleLanguage: 'ar',
										articleTitle: allLinks[i].articleTitle,
										articleImageURL: allLinks[i].articleImageURL,
										articleDescription: htmlDescription,
										articleSourceLink: allLinks[i].articleNabdLink,
										categoryName: categoryTranslated,
										authorName: null,
										mediaName: allLinks[i].mediaName,
										mediaLogo: mediaLogo,
									})
									.then(async (res) => {
										//! Wordpress Uncomment
										// let imageID;
										// const mediaCreated = await wp.media().file('./image.jpg').create({
										// 	title: allLinks[i].articleTitle,
										// 	alt_text: allLinks[i].articleTitle,
										// 	caption: allLinks[i].articleTitle,
										// 	description: allLinks[i].articleTitle,
										// });
										// imageID = mediaCreated.id;
										// const postCreated = await wp.posts().create({
										// 	title: allLinks[i].articleTitle,
										// 	content: htmlDescription,
										// 	status: 'publish',
										// 	media: imageID,
										// 	featured_media: imageID,
										// 	categories: [categoriesIDs[modelName]],
										// });
									})
									.catch((err) => console.log(err));
							}
						}
					} else if (typeOfArticle === 'normal') {
						const data = await page.evaluate(() => document.querySelector('*').outerHTML);
						const dom = new JSDOM(data);
						const mediaLogo = dom.window.document
							.querySelector('#nb-pub-details > a > img')
							.getAttribute('src');
						let preDescription = dom.window.document.querySelector('.nb-article-content');
						let description = '';
						if (preDescription !== null) {
							description = dom.window.document.querySelector('.nb-article-content').innerHTML;
						} else {
							description = '';
						}

						// description = description + '';
						let prePreSourceLink = dom.window.document.querySelector('.nb-view-full-story');
						let preSourceLink = '';
						if (prePreSourceLink !== null) {
							preSourceLink = dom.window.document
								.querySelector('.nb-view-full-story')
								.getAttribute('href');
						} else {
							preSourceLink = '';
						}

						//! WORDPRESS Uncomment
						// try {
						// 	const response = await fetch(encodeURI(allLinks[i].articleImageURL));
						// 	const buffer = await response.buffer();
						// 	Fs.writeFileSync('./image.jpg', buffer);
						// } catch (error) {
						// 	console.log('Cant save image');
						// }

						const already = await articlesModel.find({ originalArticleID: allLinks[i].originalArticleID });

						if (already.length > 0) {
							console.log('Already published');
						} else if (already.length === 0) {
							const categoryTranslated = getTranslatedCategory(modelName);

							await articlesModel
								.create({
									originalArticleID: allLinks[i].originalArticleID,
									articleCreatedDate: new Date(),
									articleType: 'Article',
									videoLink: null,
									articleLanguage: 'ar',
									articleTitle: allLinks[i].articleTitle,
									articleImageURL: allLinks[i].articleImageURL,
									articleDescription: description,
									articleSourceLink: allLinks[i].articleNabdLink,
									categoryName: categoryTranslated,
									authorName: null,
									mediaName: allLinks[i].mediaName,
									mediaLogo: mediaLogo,
								})
								.then(async (res) => {
									//! Wordpress Uncomment
									// let imageID;
									// const mediaCreated = await wp.media().file('./image.jpg').create({
									// 	title: allLinks[i].articleTitle,
									// 	alt_text: allLinks[i].articleTitle,
									// 	caption: allLinks[i].articleTitle,
									// 	description: allLinks[i].articleTitle,
									// });
									// imageID = mediaCreated.id;
									// const postCreated = await wp.posts().create({
									// 	title: allLinks[i].articleTitle,
									// 	content: description,
									// 	status: 'publish',
									// 	media: imageID,
									// 	featured_media: imageID,
									// 	categories: [categoriesIDs[modelName]],
									// });
								})
								.catch((err) => console.log(err));
						}

						await premodel.findByIdAndDelete({ _id: allLinks[i]._id });
					}
				} catch (error) {
					console.log(error.message);
				}
			}
			await browser.close();
			if (currentStep === allLinks.length) {
				await task.findByIdAndUpdate(taskId, {
					dateFinished: Date.now(),
					status: 'finished',
				});
			}
		});
};

const checkTypeOfArticle = async (page) => {
	const isVideoArticle = await page.evaluate(() => document.querySelector('#nb-video-element'));
	const isYoutubeArticle = await page.evaluate(() => document.querySelector('#player'));
	if (isVideoArticle !== null || isYoutubeArticle !== null) {
		return 'video';
	} else if (isVideoArticle === null) {
		return 'normal';
	}

	return 'normal';
};

const checkVideoType = async (page) => {
	const isInternVideo = await page.evaluate(() => document.querySelector('#nb-video-element'));
	const isYoutubeVideo = await page.evaluate(() => document.querySelector('#player'));
	if (isInternVideo !== null) {
		return 'intern';
	} else if (isYoutubeVideo !== null) {
		return 'youtube';
	}
};

const j = schedule.scheduleJob('*/10 * * * * *', async function () {
	const runningTasks = await task.find({
		status: 'running',
	});
	if (runningTasks.length >= 1) {
		const dateNow = Date.now();
		const dbDate = new Date(runningTasks[0].dateLaunched).getTime();
		let diff = (dateNow - dbDate) / 1000;
		diff /= 60;
		const minutesSpended = Math.abs(Math.round(diff));
		console.warn(`${runningTasks[0].taskName} task is running for about ${minutesSpended} minutes`);
		if (minutesSpended > 10) {
			console.error(
				`Oh no, you should kill the ${runningTasks[0].taskName} task!!, it takes more than ${minutesSpended} minutes to finish`
			);
			// Set his status to failed
			await task.findByIdAndUpdate(runningTasks[0]._id, {
				status: 'failed',
			});
			// Restart the process ( to close the currently running browser instance)
			shell.exec('pm2 restart article');
			console.warn('the stucked process was killed with success!');
		}
	} else if (runningTasks.length === 0) {
		console.log(
			'No task is running right now, the Queued ones will be executed if are they available!',
			new Date().toISOString()
		);
		const firstQueuedTask = await task.find({
			status: 'queued',
		});
		if (firstQueuedTask.length >= 1) {
			let taskName = firstQueuedTask[0].taskName;
			switch (taskName) {
				case 'Morocco':
					await scrapArticle(preMoroccoArticle, Morocco, 'Morocco', firstQueuedTask[0]._id);
					break;
				case 'Algeria':
					await scrapArticle(preAlgeriaArticle, Algeria, 'Algeria', firstQueuedTask[0]._id);
					break;
				case 'Kuwait':
					await scrapArticle(preKuwaitArticle, Kuwait, 'Kuwait', firstQueuedTask[0]._id);
					break;
				case 'Palestine':
					await scrapArticle(prePalestineArticle, Palestine, 'Palestine', firstQueuedTask[0]._id);
					break;
				case 'World':
					await scrapArticle(preWorldArticle, World, 'World', firstQueuedTask[0]._id);
					break;
				case 'Tunisia':
					await scrapArticle(preTunisiaArticle, Tunisia, 'Tunisia', firstQueuedTask[0]._id);
					break;
				case 'SaudiArabia':
					await scrapArticle(preSaudiArabiaArticle, SaudiArabia, 'SaudiArabia', firstQueuedTask[0]._id);
					break;
				case 'Yemen':
					await scrapArticle(preYemenArticle, Yemen, 'Yemen', firstQueuedTask[0]._id);
					break;
				case 'Women':
					await scrapArticle(preWomenArticle, Women, 'Women', firstQueuedTask[0]._id);
					break;
				case 'Tourist':
					await scrapArticle(preTouristArticle, Tourist, 'Tourist', firstQueuedTask[0]._id);
					break;
				case 'Technology':
					await scrapArticle(preTechnologyArticle, Technology, 'Technology', firstQueuedTask[0]._id);
					break;
				case 'Sport':
					await scrapArticle(preSportArticle, Sport, 'Sport', firstQueuedTask[0]._id);
					break;
				case 'Oman':
					await scrapArticle(preOmanArticle, Oman, 'Oman', firstQueuedTask[0]._id);
					break;
				case 'Libya':
					await scrapArticle(preLibyaArticle, Libya, 'Libya', firstQueuedTask[0]._id);
					break;
				case 'Lebanon':
					await scrapArticle(preLebanonArticle, Lebanon, 'Lebanon', firstQueuedTask[0]._id);
					break;
				case 'Knowledge':
					await scrapArticle(preKnowledgeArticle, Knowledge, 'Knowledge', firstQueuedTask[0]._id);
					break;
				case 'Jordan':
					await scrapArticle(preJordanArticle, Jordan, 'Jordan', firstQueuedTask[0]._id);
					break;
				case 'Iraq':
					await scrapArticle(preIraqArticle, Iraq, 'Iraq', firstQueuedTask[0]._id);
					break;
				case 'Health':
					await scrapArticle(preHealthArticle, Health, 'Health', firstQueuedTask[0]._id);
					break;
				case 'Emirates':
					await scrapArticle(preEmiratesArticle, Emirates, 'Emirates', firstQueuedTask[0]._id);
					break;
				case 'Egypt':
					await scrapArticle(preEgyptArticle, Egypt, 'Egypt', firstQueuedTask[0]._id);
					break;
				case 'Economy':
					await scrapArticle(preEconomyArticle, Economy, 'Economy', firstQueuedTask[0]._id);
					break;
				case 'Cooking':
					await scrapArticle(preCookingArticle, Cooking, 'Cooking', firstQueuedTask[0]._id);
					break;
				case 'Cars':
					await scrapArticle(preCarsArticle, Cars, 'Cars', firstQueuedTask[0]._id);
					break;
				case 'Bahrain':
					await scrapArticle(preBahrainArticle, Bahrain, 'Bahrain', firstQueuedTask[0]._id);
					break;
				case 'Urgent':
					await scrapArticle(preUrgentArticle, Urgent, 'Urgent', firstQueuedTask[0]._id);
			}
		}
	}
});
