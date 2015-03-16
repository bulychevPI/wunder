var mongoose= require('mongoose');
var Schema=mongoose.Schema;
var SubTaskSchema= new Schema({
	done: Boolean,
	text: String
});
var TaskSchema= new Schema({
	subTasks: [SubTaskSchema],
	attaches: Buffer,
	done: Boolean,
	text: String
});
var UserSchema= new Schema({
	mail: String,
	password: String,
	Lists: [ListSchema]
});
var ListSchema= new Schema({
	tasks: [TaskSchema],
	owner: User,
	users: [User],
	description: String;
});
