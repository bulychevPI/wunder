var List= require('../models/List').model;
var User= require('../models/User').model;
exports.getMyLists=function(req, res, next) {
	User.findOne({mail:req.user.mail}).populate('Lists')
	.exec(function(err,user){
		//err? next(new Error):
		res.json(user.Lists);
	});
};
exports.getAllLists=function(req, res, next) {
	List.find({}).populate('users')
	.exec(function(err,lists){
		res.send(lists);
	});
};
exports.postList=function(req, res, next) {
	User.findOne({mail:req.user.mail},function(err,user){
		//err? next(new Error):
		List.create({
			name:req.body.name,
			users:[user],
		},function(err,list){
			if(err)res.send(err);
			//user.Lists.push(list._id);
			res.send(list);
		});
		
	});
};