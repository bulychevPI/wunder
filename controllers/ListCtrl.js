var List= require('../models/List').model;
var User= require('../models/User').model;
exports.getMyLists=function(req, res, next) {
	User.findOne({_id:req.user._id},function(err,user){
		//err? next(new Error):
		res.json(user.MyLists);
	});
};
exports.getAllLists=function(req, res, next) {
	List.findOne({},function(err,lists){
		// var temp=lists.users.id(req.user._id);
		
		res.send(lists);
	});
};
exports.postList=function(req, res, next) {
	User.findOne({_id:req.user._id},function(err,user){
		//err? next(new Error):

		List.create({
			name:req.body.name,
			user:user._id,
		},function(err,list){
			if(err)res.send(err);
			user.MyLists.push(list);
			user.save();
			res.send(user);
		});
		
	});
};