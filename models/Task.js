var mongoose= require('mongoose');
var Schema=mongoose.Schema;
var TaskSchema= new Schema({
	subTasks: [{
		text:String,
		done: Boolean
	}],
	attaches: Buffer,
	done: {type:Boolean, default:false},
	header:String,
	date: Date,
	desc: String
});

module.exports.model=mongoose.model("Task",TaskSchema);
module.exports.schema=TaskSchema;