const task = require('../models/task');

exports.createTask = async (taskName) => {
	const alreadyCreated = await task.find({ taskName, status: 'queued' });
	if (alreadyCreated.length >= 1) {
		//* that means task already created
		console.log(`${taskName} task is already created`);
		return;
	} else {
		try {
			await task.create({
				taskName: taskName,
				status: 'queued',
			});
			console.log(`All ${taskName} home articles are scraped, now we will create a task`);
			console.log(
				`${taskName} task created with success`,
				new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
			);
		} catch (error) {
			console.log(error.message);
		}
	}
};
