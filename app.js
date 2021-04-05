const puppeteer = require('puppeteer-extra');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
var schedule = require('node-schedule');
const { createTask } = require('./functions/createTask');

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

var puppeteerAutoscrollDown = require('puppeteer-autoscroll-down');
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
puppeteer.use(AdblockerPlugin());

// Importing Modules
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Setting Environmental Variables
dotenv.config({ path: './config.env' });

// Connecting MongoDB
const DB = 'mongodb://youpel:199747@164.90.141.28:27017/postgoo';
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

// ! 27-d6633d
let all = [];
const homePageScraper = async (model, categoryID, taskName) => {
	all = [];
	puppeteer
		.launch({ headless: true, args: ['--single-process', '--no-zygote', '--no-sandbox'] })
		.then(async (browser) => {
			const page = await browser.newPage();
			await page.bringToFront();
			await page.setViewport({ width: 1366, height: 768 });
			try {
				await page.goto(`https://nabd.com/category/${categoryID}`);
			} catch (error) {
				await browser.close();
			}
			await page.waitForTimeout(5000);
			const data = await page.evaluate(() => document.querySelector('*').outerHTML);
			const dom = new JSDOM(data);
			let full = dom.window.document.querySelectorAll('.regular-story');

			for (i = 0; i < full.length; i++) {
				try {
					let articleTitle = full[i].children[0].children[0].children[0].getAttribute('title');
					let articleImageURL = full[i].children[1].children[0].children[0].getAttribute('data-src');
					if (articleImageURL === null) {
						articleImageURL = full[i].children[1].children[0].children[0].getAttribute('src');
					}
					let articleNabdLink = full[i].children[0].children[0].children[0].getAttribute('href');
					let originalArticleID = articleNabdLink.split('/s/')[1].split('/')[0];
					let mediaName = full[i].children[0].children[1].children[0].textContent;
					all.push({ articleTitle, articleImageURL, articleNabdLink, mediaName, originalArticleID });
				} catch (error) {
					await browser.close();
					console.log(error.message);
				}
			}
			try {
				await createTask(taskName);
				await model.insertMany(all, { ordered: false });
			} catch (error) {}
			await browser.close();
		})
		.catch((err) => console.log(err.message));
	all = [];
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

const moroccoJob = schedule.scheduleJob('48 * * * *', async function () {
	console.log('Morocco preJOB is executing', new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''));
	homePageScraper(preMoroccoArticle, Morocco, 'Morocco');
});

const algeriaJob = schedule.scheduleJob('50 * * * *', async function () {
	console.log('Algeria preJOB is executing', new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''));
	homePageScraper(preAlgeriaArticle, Algeria, 'Algeria');
});

const kuwaitJob = schedule.scheduleJob('52 * * * *', async function () {
	console.log('Kuwait preJOB is executing', new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''));
	homePageScraper(preKuwaitArticle, Kuwait, 'Kuwait');
});
const palestineJob = schedule.scheduleJob('54 * * * *', async function () {
	console.log('Palestine preJOB is executing', new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''));
	homePageScraper(prePalestineArticle, Palestine, 'Palestine');
});

const worldJob = schedule.scheduleJob('56 * * * *', async function () {
	console.log('World preJOB is executing', new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''));
	homePageScraper(preWorldArticle, World, 'World');
});

const tunisiaJob = schedule.scheduleJob('58 * * * *', async function () {
	console.log('Tunisia preJOB is executing', new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''));
	homePageScraper(preTunisiaArticle, Tunisia, 'Tunisia');
});

const saudiarabiaJob = schedule.scheduleJob('00 * * * *', async function () {
	console.log('Saudi Arabia preJOB is executing', new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''));
	homePageScraper(preSaudiArabiaArticle, SaudiArabia, 'SaudiArabia');
});

const yemenJob = schedule.scheduleJob('02 * * * *', async function () {
	console.log('Yemen preJOB is executing', new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''));
	homePageScraper(preYemenArticle, Yemen, 'Yemen');
});

const womenJob = schedule.scheduleJob('04 * * * *', async function () {
	console.log('Women preJOB is executing', new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''));
	homePageScraper(preWomenArticle, Women, 'Women');
});

const touristJob = schedule.scheduleJob('06 * * * *', async function () {
	console.log('Tourist preJOB is executing', new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''));
	homePageScraper(preTouristArticle, Tourist, 'Tourist');
});

const technologyJob = schedule.scheduleJob('08 * * * *', async function () {
	console.log('Technology preJOB is executing', new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''));
	homePageScraper(preTechnologyArticle, Technology, 'Technology');
});

const sportJob = schedule.scheduleJob('10 * * * *', async function () {
	console.log('Sport preJOB is executing', new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''));
	homePageScraper(preSportArticle, Sport, 'Sport');
});

const omanJob = schedule.scheduleJob('12 * * * *', async function () {
	console.log('Oman preJOB is executing', new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''));
	homePageScraper(preOmanArticle, Oman, 'Oman');
});
const libyaJob = schedule.scheduleJob('14 * * * *', async function () {
	console.log('Libya preJOB is executing', new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''));
	homePageScraper(preLibyaArticle, Libya, 'Libya');
});
const lebanonJob = schedule.scheduleJob('16 * * * *', async function () {
	console.log('Lebanon preJOB is executing', new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''));
	homePageScraper(preLebanonArticle, Lebanon, 'Lebanon');
});

const knowledgeJob = schedule.scheduleJob('18 * * * *', async function () {
	console.log('Knowledge preJOB is executing', new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''));
	homePageScraper(preKnowledgeArticle, Knowledge, 'Knowledge');
});

const jordanJob = schedule.scheduleJob('20 * * * *', async function () {
	console.log('Jordan preJOB is executing', new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''));
	homePageScraper(preJordanArticle, Jordan, 'Jordan');
});

const iraqJob = schedule.scheduleJob('22 * * * *', async function () {
	console.log('Iraq preJOB is executing', new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''));
	homePageScraper(preIraqArticle, Iraq, 'Iraq');
});

const healthJob = schedule.scheduleJob('24 * * * *', async function () {
	console.log('Health preJOB is executing', new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''));
	homePageScraper(preHealthArticle, Health, 'Health');
});

const emiratesJob = schedule.scheduleJob('26 * * * *', async function () {
	console.log('Emirates preJOB is executing', new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''));
	homePageScraper(preEmiratesArticle, Emirates, 'Emirates');
});

const egyptJob = schedule.scheduleJob('28 * * * *', async function () {
	console.log('Egypt preJOB is executing', new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''));
	homePageScraper(preEgyptArticle, Egypt, 'Egypt');
});

const economyJob = schedule.scheduleJob('30 * * * *', async function () {
	console.log('Economy preJOB is executing', new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''));
	homePageScraper(preEconomyArticle, Economy, 'Economy');
});

const cookingJob = schedule.scheduleJob('32 * * * *', async function () {
	console.log('Cooking preJOB is executing', new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''));
	homePageScraper(preCookingArticle, Cooking, 'Cooking');
});

const carsJob = schedule.scheduleJob('34 * * * *', async function () {
	console.log('Cars preJOB is executing', new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''));
	homePageScraper(preCarsArticle, Cars, 'Cars');
});

const bahrainJob = schedule.scheduleJob('36 * * * *', async function () {
	console.log('Bahrain preJOB is executing', new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''));
	homePageScraper(preBahrainArticle, Bahrain, 'Bahrain');
});

const urgentJob = schedule.scheduleJob('38 * * * *', async function () {
	console.log('Urgent preJOB is executing', new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''));
	homePageScraper(preUrgentArticle, Urgent, 'Urgent');
});
