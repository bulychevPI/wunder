var List= require('../models/List').model;
var Task= require('../models/Task').model;
var User= require('../models/User').model;
exports.postTask=function(req,res,next) {
	List.findOne({_id:req.body.l_id},function(err,list){
		Task.create({
			header:req.body.header,
			done:false,
		},function(err,task){
			if(err)res.send(err);
			list.MyTasks.push(task);
			list.save(function(err){
				if(err)res.send(err);
			});
			res.send(list);
		});
	});
};


exports.getTasks=function(req,res,next) {
	List.findOne({_id:req.params.l_id},function(err,list){
		res.send(list);
	});
}