const schedule = require('node-schedule');
const puppeteer = require('puppeteer-extra');
const axios = require('axios');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
var schedule = require('node-schedule');
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

const AlgeriaArticle = require('./models/articles/AlgeriaModel');
const BahrainArticle = require('./models/articles/BahrainModel');
const CarsArticle = require('./models/articles/CarsModel');
const CookingArticle = require('./models/articles/CookingModel');
const EconomyArticle = require('./models/preEconomyModel');
const EgyptArticle = require('./models/articles/EgyptModel');
const EmiratesArticle = require('./models/articles/EmiratesModel');
const HealthArticle = require('./models/articles/HealthModel');
const IraqArticle = require('./models/articles/IraqModel');
const JordanArticle = require('./models/articles/JordanModel');
const KnowledgeArticle = require('./models/articles/KnowledgeModel');
const KuwaitArticle = require('./models/articles/KuwaitModel');
const LebanonArticle = require('./models/articles/LebanonModel');
const LibyaArticle = require('./models/articles/LibyaModel');
const MoroccoArticle = require('./models/articles/MoroccoModel');
const OmanArticle = require('./models/articles/OmanModel');
const PalestineArticle = require('./models/articles/PalestineModel');
const SaudiArabiaArticle = require('./models/articles/SaudiArabiaModel');
const SportArticle = require('./models/articles/SportModel');
const TechnologyArticle = require('./models/articles/TechnologyModel');
const TouristArticle = require('./models/articles/TouristModel');
const TunisiaArticle = require('./models/articles/TunisiaModel');
const UrgentArticle = require('./models/articles/UrgentModel');
const WomenArticle = require('./models/articles/WomenModel');
const WorldArticle = require('./models/articles/WorldModel');
const YemenArticle = require('./models/articles/YemenModel');
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

const { scrapArticle } = require('./article');
const taskArticle = require('./models/taskArticle');
