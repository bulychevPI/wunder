var mongoose= require('mongoose');
var Schema=mongoose.Schema;
var TaskSchema= new Schema({
	subTasks: [{
		text:String,
		done: Boolean
	}],
	owner: {type:Schema.ObjectId, ref: "User"},
	attaches: Buffer,
	done: {type:Boolean, default:false},
	header:String,
	dueDate: Date,
	limited: Boolean,
	desc: String
});

module.exports.model=mongoose.model("Task",TaskSchema);
module.exports.schema=TaskSchema;