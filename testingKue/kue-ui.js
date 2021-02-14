let kue = require('kue');
let queue = kue.createQueue();
let express = require('express');
let ui = require('kue-ui');
let app = express();

ui.setup({
	apiUrl: '/api',
	baseURL: '/kue',
	updateInterval: 5000,
});

app.use('/api', kue.app);
app.use('/kue', ui.app);
app.listen(5000);
console.log('Listening on port 5000');
