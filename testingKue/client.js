let kue = require('kue');
let queue = kue.createQueue();

// event handler. called when job is saved to the redis

queue.on('job enqueue', function () {
	//****** */ console.log('Job submitted in the Queue');
	process.exit(0);
});

let job = queue
	.create('download', {
		file: 'Sample/path/to/file',
	})
	.attempts(3)
	.backoff({ delay: 2000 })
	.save();

let job2 = queue
	.create('job2', {
		file: 'Sample/path/hello',
	})
	.save();
