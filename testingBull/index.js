const puppeteer = require('puppeteer-extra');
const axios = require('axios');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
var schedule = require('node-schedule');
const preAlgeriaArticle = require('../models/preAlgeriaModel');
const preBahrainArticle = require('../models/preBahrainModel');
const preCarsArticle = require('../models/preCarsModel');
const preCookingArticle = require('../models/preCookingModel');
const preEconomyArticle = require('../models/preEconomyModel');
const preEgyptArticle = require('../models/preEgyptModel');
const preEmiratesArticle = require('../models/preEmiratesModel');
const preHealthArticle = require('../models/preHealthModel');
const preIraqArticle = require('../models/preIraqModel');
const preJordanArticle = require('../models/preJordanModel');
const preKnowledgeArticle = require('../models/preKnowledgeModel');
const preKuwaitArticle = require('../models/preKuwaitModel');
const preLebanonArticle = require('../models/preLebanonModel');
const preLibyaArticle = require('../models/preLibyaModel');
const preMoroccoArticle = require('../models/preMoroccoModel');
const preOmanArticle = require('../models/preOmanModel');
const prePalestineArticle = require('../models/prePalestineModel');
const preSaudiArabiaArticle = require('../models/preSaudiArabiaModel');
const preSportArticle = require('../models/preSportModel');
const preTechnologyArticle = require('../models/preTechnologyModel');
const preTouristArticle = require('../models/preTouristModel');
const preTunisiaArticle = require('../models/preTunisiaModel');
const preUrgentArticle = require('../models/preUrgentModel');
const preWomenArticle = require('../models/preWomenModel');
const preWorldArticle = require('../models/preWorldModel');
const preYemenArticle = require('../models/preYemenModel');

//! MODELS

const AlgeriaArticle = require('../models/articles/AlgeriaModel');
const BahrainArticle = require('../models/articles/BahrainModel');
const CarsArticle = require('../models/articles/CarsModel');
const CookingArticle = require('../models/articles/CookingModel');
const EconomyArticle = require('../models/preEconomyModel');
const EgyptArticle = require('../models/articles/EgyptModel');
const EmiratesArticle = require('../models/articles/EmiratesModel');
const HealthArticle = require('../models/articles/HealthModel');
const IraqArticle = require('../models/articles/IraqModel');
const JordanArticle = require('../models/articles/JordanModel');
const KnowledgeArticle = require('../models/articles/KnowledgeModel');
const KuwaitArticle = require('../models/articles/KuwaitModel');
const LebanonArticle = require('../models/articles/LebanonModel');
const LibyaArticle = require('../models/articles/LibyaModel');
const MoroccoArticle = require('../models/articles/MoroccoModel');
const OmanArticle = require('../models/articles/OmanModel');
const PalestineArticle = require('../models/articles/PalestineModel');
const SaudiArabiaArticle = require('../models/articles/SaudiArabiaModel');
const SportArticle = require('../models/articles/SportModel');
const TechnologyArticle = require('../models/articles/TechnologyModel');
const TouristArticle = require('../models/articles/TouristModel');
const TunisiaArticle = require('../models/articles/TunisiaModel');
const UrgentArticle = require('../models/articles/UrgentModel');
const WomenArticle = require('../models/articles/WomenModel');
const WorldArticle = require('../models/articles/WorldModel');
const YemenArticle = require('../models/articles/YemenModel');
const categories = require('../categories');

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
const { scrapArticle } = require('../article');
var puppeteerAutoscrollDown = require('puppeteer-autoscroll-down');
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
puppeteer.use(AdblockerPlugin());

// Importing Modules
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Setting Environmental Variables
dotenv.config({ path: '../config.env' });

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

const Queue = require('bull');
const wait = require('wait');
//import models from '../mongoose';
// import opts from '../lib/redisConnection';

const hitApiQueue = new Queue('last-login');

hitApiQueue.process(async (job) => {
	const { preModel, model, CategoryID, modelName } = job;
	try {
		const browser = await puppeteer.launch({ headless: false });
		const page = await browser.newPage();
		await page.goto('https://example.com');
		await page.screenshot({ path: 'example.png' });
		await page.waitForTimeout(15000);
		await browser.close();
		//****** */	console.log(model);
		return Promise.resolve({ message: 'OK' });
	} catch (error) {
		Promise.reject(error);
	}
});

const hitApi = (preModel, model, CategoryID, modelName) => {
	hitApiQueue.add({ preModel, model, CategoryID, modelName });
};

const algeriaJob = schedule.scheduleJob('*/5 * * * * *', async function () {
	//****** */	console.log('Executing');
	hitApi(preAlgeriaArticle, AlgeriaArticle, Algeria, 'Algeria');
});

hitApiQueue.on('completed', (job, result) => {
	//****** */	console.log(`Job completed with result ${result}`);
});

// const moroccoJob = schedule.scheduleJob('52 * * * *', async function () {
// 	console.log('Morocco Full  JOB is executing', Date.now());
// 	scrapArticle(preMoroccoArticle, MoroccoArticle, Morocco, 'Morocco');
// });

// const algeriaJob = schedule.scheduleJob('54 * * * *', async function () {
// 	console.log('Algeria Full  JOB is executing', Date.now());
// 	scrapArticle(preAlgeriaArticle, AlgeriaArticle, Algeria, 'Algeria');
// });

// const kuwaitJob = schedule.scheduleJob('56 * * * *', async function () {
// 	console.log('Kuwait Full  JOB is executing', Date.now());
// 	scrapArticle(preKuwaitArticle, KuwaitArticle, Kuwait, 'Kuwait');
// });
// const palestineJob = schedule.scheduleJob('58 * * * *', async function () {
// 	console.log('Palestine Full  JOB is executing', Date.now());
// 	scrapArticle(prePalestineArticle, PalestineArticle, Palestine, 'Palestine');
// });

// const worldJob = schedule.scheduleJob('00 * * * *', async function () {
// 	console.log('World Full  JOB is executing', Date.now());
// 	scrapArticle(preWorldArticle, WorldArticle, World, 'World');
// });

// const tunisiaJob = schedule.scheduleJob('02 * * * *', async function () {
// 	console.log('Tunisia Full  JOB is executing', Date.now());
// 	scrapArticle(preTunisiaArticle, TunisiaArticle, Tunisia, 'Tunisia');
// });

// const saudiarabiaJob = schedule.scheduleJob('04 * * * *', async function () {
// 	console.log('Saudi Arabia Full  JOB is executing', Date.now());
// 	scrapArticle(preSaudiArabiaArticle, SaudiArabiaArticle, SaudiArabia, 'Saudi Arabia');
// });

// const yemenJob = schedule.scheduleJob('06 * * * *', async function () {
// 	console.log('Yemen Full  JOB is executing', Date.now());
// 	scrapArticle(preYemenArticle, YemenArticle, Yemen, 'Yemen');
// });

// const womenJob = schedule.scheduleJob('08 * * * *', async function () {
// 	console.log('Women Full  JOB is executing', Date.now());
// 	scrapArticle(preWomenArticle, WomenArticle, Women, 'Women');
// });

// const touristJob = schedule.scheduleJob('10 * * * *', async function () {
// 	console.log('Tourist Full  JOB is executing', Date.now());
// 	scrapArticle(preTouristArticle, TouristArticle, Tourist, 'Tourist');
// });

// const technologyJob = schedule.scheduleJob('12 * * * *', async function () {
// 	console.log('Technology Full  JOB is executing', Date.now());
// 	scrapArticle(preTechnologyArticle, TechnologyArticle, Technology, 'Technology');
// });

// const sportJob = schedule.scheduleJob('14 * * * *', async function () {
// 	console.log('Sport Full  JOB is executing', Date.now());
// 	scrapArticle(preSportArticle, SportArticle, Sport, 'Sport');
// });

// const omanJob = schedule.scheduleJob('16 * * * *', async function () {
// 	console.log('Oman Full  JOB is executing', Date.now());
// 	scrapArticle(preOmanArticle, OmanArticle, Oman, 'Oman');
// });
// const libyaJob = schedule.scheduleJob('18 * * * *', async function () {
// 	console.log('Libya Full  JOB is executing', Date.now());
// 	scrapArticle(preLibyaArticle, LibyaArticle, Libya, 'Libya');
// });
// const lebanonJob = schedule.scheduleJob('20 * * * *', async function () {
// 	console.log('Lebanon Full  JOB is executing', Date.now());
// 	scrapArticle(preLebanonArticle, LebanonArticle, Lebanon, 'Lebanon');
// });

// const knowledgeJob = schedule.scheduleJob('22 * * * *', async function () {
// 	console.log('Knowledge Full  JOB is executing', Date.now());
// 	scrapArticle(preKnowledgeArticle, KnowledgeArticle, Knowledge, 'Knowledge');
// });

// const jordanJob = schedule.scheduleJob('24 * * * *', async function () {
// 	console.log('Jordan Full  JOB is executing', Date.now());
// 	scrapArticle(preJordanArticle, JordanArticle, Jordan, 'Jordan');
// });

// const iraqJob = schedule.scheduleJob('26 * * * *', async function () {
// 	console.log('Iraq Full  JOB is executing', Date.now());
// 	scrapArticle(preIraqArticle, IraqArticle, Iraq, 'Iraq');
// });

// const healthJob = schedule.scheduleJob('28 * * * *', async function () {
// 	console.log('Health Full  JOB is executing', Date.now());
// 	scrapArticle(preHealthArticle, HealthArticle, Health, 'Health');
// });

// const emiratesJob = schedule.scheduleJob('30 * * * *', async function () {
// 	console.log('Emirates Full  JOB is executing', Date.now());
// 	scrapArticle(preEmiratesArticle, EmiratesArticle, Emirates, 'Emirates');
// });

// const egyptJob = schedule.scheduleJob('32 * * * *', async function () {
// 	console.log('Egypt Full  JOB is executing', Date.now());
// 	scrapArticle(preEgyptArticle, EgyptArticle, Egypt, 'Egypt');
// });

// const economyJob = schedule.scheduleJob('34 * * * *', async function () {
// 	console.log('Economy Full  JOB is executing', Date.now());
// 	scrapArticle(preEconomyArticle, EconomyArticle, Economy, 'Economy');
// });

// const cookingJob = schedule.scheduleJob('36 * * * *', async function () {
// 	console.log('Cooking Full  JOB is executing', Date.now());
// 	scrapArticle(preCookingArticle, CookingArticle, Cooking, 'Cooking');
// });

// const carsJob = schedule.scheduleJob('38 * * * *', async function () {
// 	console.log('Cars Full  JOB is executing', Date.now());
// 	scrapArticle(preCarsArticle, CarsArticle, Cars, 'Cars');
// });

// const bahrainJob = schedule.scheduleJob('40 * * * *', async function () {
// 	console.log('Bahrain Full  JOB is executing', Date.now());
// 	scrapArticle(preBahrainArticle, BahrainArticle, Bahrain, 'Bahrain');
// });

// const urgentJob = schedule.scheduleJob('42 * * * *', async function () {
// 	console.log('Urgent Full  JOB is executing', Date.now());
// 	scrapArticle(preUrgentArticle, UrgentArticle, Urgent, 'Urgent');
// });
