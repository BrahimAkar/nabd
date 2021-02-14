let kue = require('kue');
let queue = kue.createQueue();
const wait = require('wait');
const puppeteer = require('puppeteer');

queue.process('download', function (job, done) {
	console.log(`Working on job ${job.id}`);
	console.log(job.data);
	downloadFile(job.data.file, done);
});
queue.process('job2', function (job, done) {
	console.log(`Working on job ${job.id}`);
	console.log(job.data);
	downloadFile(job.data.file, done);
});

async function downloadFile(file, done) {
	console.log(`Downloading file ${file}`);
	await wait(9000);
	console.log('Download complete');
	done();
}
// //!
// const kue = require('kue-scheduler');
// const Queue = kue.createQueue();
// const puppeteer = require('puppeteer');
// const jobOneSchedule = '*/10 * * * * *';
// const jobTwoSchedule = '*/10 * * * * *';

// let job1 = Queue.createJob('doJobOne').priority('low').unique('unique_one').removeOnComplete('true');

// let job2 = Queue.createJob('doJobTwo').priority('high').unique('unique_two').removeOnComplete('true');

// Queue.every(jobOneSchedule, job1);
// Queue.every(jobTwoSchedule, job2);

// Queue.process('doJobOne', async function (job, done) {
// 	const browser = await puppeteer.launch({ headless: false });
// 	const page = await browser.newPage();
// 	await page.goto('https://example.com');
// 	await page.screenshot({ path: 'example.png' });

// 	await browser.close();

// 	console.log('Job one done');
// 	done();
// });

// Queue.process('doJobTwo', async function (job, done) {
// 	const browser = await puppeteer.launch({ headless: false });
// 	const page = await browser.newPage();
// 	await page.goto('https://example.com');
// 	await page.screenshot({ path: 'example.png' });

// 	await browser.close();

// 	console.log('Job one done');
// 	done();
// 	console.log('Job two through');
// 	done();
// });
