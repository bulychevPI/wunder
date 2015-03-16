var mongoose= require('mongoose');
var Schema=mongoose.Schema;

var UserSchema= new Schema({
	mail: {
		type:String,
		unique:true,
		lowercase: true
	},
	password: String,
	Lists: [{
		type: Schema.Types.ObjectId,
		ref: 'List'
	}]
});

module.exports.model=mongoose.model("User",UserSchema);
module.exports.schema=UserSchema;