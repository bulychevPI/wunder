var List= require('../models/List').model;
var User= require('../models/User').model;
exports.getMyLists=function(req, res, next) {
	User.findOne({_id:req.user._id},function(err,user){
		//err? next(new Error):
		res.json(user.MyLists);
	});
};
exports.getAllLists=function(req, res, next) {
	List.find({},function(err,lists){
		// var temp=lists.users.id(req.user._id);
		
		res.send(lists);
	});
};



//DELETE   /lists
//id : 12354654fdsf54
exports.deleteList=function(req, res, next) {
	User.findOne({_id:req.user._id},function(err,user){
		var deleted=user.MyLists.id(req.body.id).remove();
		user.save();
		res.send(deleted.name + ' is deleted');
	});
};

// not tested
// POST  /lists/asign_user
// u_id : id of user to assign
// l_id : id of list to assign
exports.asignListToUser=function(req,res,next) {
	User.findOne({_id:req.body.u_id},function(err,user){
		List.findOne({_id:req.body.l_id},function(err,list){
			user.ForeignLists.push(list.toObject);
			user.save();
		})

	});
};
//  not tested
//POST  /lists/rename
//l_id : id of list to rename
//newname : new name of list
exports.renameList=function(req,res,next) {
	
		User.findOne({_id:req.user._id},function(err,user){
			if (err) res.send(err);
			var temp = user.MyLists.id(req.body.l_id);
			temp.name=req.body.newname;

			user.save();
			res.send(temp);
		});
		
};

exports.postList=function(req, res, next) {
	User.findOne({_id:req.user._id},function(err,user){
		//err? next(new Error):
		List.create({
			name:req.body.name,
			owner:user._id,
		},function(err,list){
			if(err)res.send(err);
			user.MyLists.push(list);
			user.save();
			res.send(user);
		});
		
	});
};