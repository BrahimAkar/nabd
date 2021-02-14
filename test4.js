// const task = require('./models/task');
// const puppeteer = require('puppeteer');
// const shell = require('shelljs');

// let spendedMinutes = 0;

// async function tt() {
// 	setInterval(() => {
// 		spendedMinutes++;
// 	}, 60000);

// 	if (spendedMinutes >= 1) {
// 		console.log('A minute is over');
// 	}
// 	const browser = await puppeteer.launch({
// 		headless: false,
// 		args: ['--single-process', '--no-zygote', '--no-sandbox'],
// 	});
// 	const page = await browser.newPage();
// 	await page.goto('https://example.com');
// 	await page.screenshot({ path: 'example.png' });
// }
// tt();
// // setInterval(() => {
// // 	shell.exec('pm2 restart 0', {}, (r) => {
// // 		console.log(r);
// // 	});

// // 	process.exit(0);
// // }, 10000);

// //* Cron job every 10 minutes
// //! Check if theres is a running process that takes more that 10 minutes to finish

// //! Set his status to failed

// //! Restart the process ( to close the currently running browser instance)
// //
