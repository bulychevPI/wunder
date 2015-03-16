var mongoose= require('mongoose');
var Schema=mongoose.Schema;
var UserSchema=require('../models/User').schema;
var ListSchema= new Schema({
	name: String,
	//tasks: [TaskShema],
	users: [UserSchema],
	description: String
});
module.exports.model=mongoose.model("List",ListSchema);
module.exports.schema=ListSchema;