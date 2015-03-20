var mongoose= require('mongoose');
var Schema=mongoose.Schema;
var TaskSchema=require('../models/Task').schema;
var ListSchema= new Schema({
	name: String,
	MyTasks: [TaskSchema],
	ForeignTasks: [TaskSchema],
	owner: {type:Schema.ObjectId, ref: "User"},
	description: String
});
module.exports.model=mongoose.model("List",ListSchema);
module.exports.schema=ListSchema;