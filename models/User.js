var mongoose= require('mongoose');
var Schema=mongoose.Schema;
var ListSchema=require('../models/List').schema;
var UserSchema= new Schema({
	mail: {
		type:String,
		unique:true,
		lowercase: true
	},
	password: String,
	MyLists: [{type:Schema.ObjectId, ref: "List"}],
	ForeignLists:[{type:Schema.ObjectId, ref: "List"}]
});

module.exports.model=mongoose.model("User",UserSchema);
module.exports.schema=UserSchema;