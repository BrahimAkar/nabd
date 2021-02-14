// Importing Dependencies

const mongoose = require('mongoose');

// User Schema
const taskSchema = new mongoose.Schema(
	{
		taskName: {
			type: String,
		},

		dateLaunched: {
			type: Date,
			default: null,
		},

		dateFinished: {
			type: Date,
			default: null,
		},
		status: {
			type: String,
			enum: ['created', 'queued', 'running', 'finished', 'failed'],
			default: 'created',
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

// taskSchema.virtual('datefinishedSM').get(function() {
//   return this.dateFinished.toString().substr(0, 19);
// });

// taskSchema.virtual('SuccessfulClicksCount').get(function () {
// 	return this.successfulClicks.length;
// });

// taskSchema.virtual('FailedClicksCount').get(function () {
// 	return this.failedClicks.length;
// });

const Task = mongoose.model('Task', taskSchema);

// Exporting User Model
module.exports = Task;
