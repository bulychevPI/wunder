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
//l_id : 12354654fdsf54
exports.deleteList=function(req, res, next) {
	User.findOne({_id:req.user._id},function(err,user){
		if(user.MyLists.indexOf(req.body.l_id)!= (-1)){
			user.MyLists.pull(req.body.l_id);
			user.save();
			List.remove({_id:req.body.l_id},function(err){
				if(err) res.send(err);
				res.end('removed from MyLists');
			})

		}
		else if(user.ForeignLists.indexOf(req.body.l_id)!== -1){
			user.ForeignLists.pull(req.body.l_id);
			user.save();
			res.end('removed from ForeignLists');
		} 
		else res.end("You can't remove this list");
			// var ind = user.MyLists.indexOf(req.body.l_id);
			// user.populate('MyLists',function(err,user){
			// 	res.send(user.MyLists[ind]);
			// });
			// List.remove(_id:re.body.l_id,function)
			// var deleted=user.MyLists.id(req.body.l_id).remove();
			// user.save();
			
		
		
		
	});
};

// not tested
// POST  /lists/asign_user
// u_id : id of user to assign
// l_id : id of list to assign
exports.asignListToUser=function(req,res,next) {
	User.findOne({_id:req.body.u_id},function(err,user){
		List.findOne({_id:req.body.l_id},function(err,list){
			if(user.ForeignLists.indexOf(req.body.l_id)== -1){
				user.ForeignLists.push(list._id);
				user.save();
				res.send('success');
			}else res.send('asigned yet');
			
		})

	});
};

//POST  /lists/rename
//l_id : id of list to rename
//newname : new name of list
exports.renameList=function(req,res,next) {
	
	List.findOneAndUpdate({_id:req.body.l_id, owner:req.user._id},{name:req.body.newname},function(err,list){
		if (err) res.send(err);
		res.send(list);
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
			user.MyLists.push(list._id);
			user.save();
			res.send(list);
		});
		
	});
};