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
		var l_id=req.query.l_id;
		if(user.MyLists.indexOf(l_id)!== (-1)){
			user.MyLists.pull(l_id);
			User.find({},function(err,users){
				users.forEach(function(user){
					if(user.ForeignLists.indexOf(l_id)!== (-1)){
						user.ForeignLists.pull(l_id);
					}
					user.save();
				});
				user.save();
				List.remove({_id:l_id},function(err){
					if(err) res.send(err);
					res.end('removed from MyLists');
				});
			});
			// User.$where(function(){
			// 	return this.ForeignLists.indexOf(l_id)!== (-1);
			// 	})
			// 	.exec(function(err,users){
			// 		users.forEach(function(user){
			// 			user.ForeignLists.pull(l_id);
			// 		});
			// 	});
			

		}
		else if(user.ForeignLists.indexOf(l_id)!== -1){
			user.ForeignLists.pull(l_id);
			user.save();
			res.end('removed from ForeignLists');
		} 
		else res.end('faild');
			// var ind = user.MyLists.indexOf(req.body.l_id);
			// user.populate('MyLists',function(err,user){
			// 	res.send(user.MyLists[ind]);
			// });
			// List.remove(_id:re.body.l_id,function)
			// var deleted=user.MyLists.id(req.body.l_id).remove();
			// user.save();
			
		
		
		
	});
};


// POST  /lists/asign
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

//POST  /lists
//l_id : id of list to rename
//newname : new name of list
exports.renameList=function(req,res,next) {
	
	List.findOneAndUpdate({_id:req.body.l_id, owner:req.user.mail},{name:req.body.newname},function(err,list){
		if (err) res.send(err);
		res.send(list);
	});
		
};


// POST     /lists/   
//name:    name of the list
exports.postList=function(req, res, next) {
	User.findOne({_id:req.user._id},function(err,user){
		//err? next(new Error):
		List.create({
			name:req.body.name,
			owner:user.mail,
		},function(err,list){
			if(err)res.send(err);
			user.MyLists.push(list._id);
			user.save();
			res.send(list);
		});
		
	});
};