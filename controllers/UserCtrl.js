var User= require('../models/User').model;
exports.add=function(req, res, next) {
	User.create(req.body,function(err,user){
		//err? next(new Error):
		res.json(user);
	});
};
exports.readOne=function(req, res, next) {
	User.findOne({mail:req.user.mail})
		.populate('MyLists')
		.populate('ForeignLists')
		.populate('Tasks')
		.exec(function(err,user){
		//err? next(new Error):
		res.send(user);
	});
};
exports.read=function(req, res, next) {
	User.find({})
	.populate('MyLists')
	.populate('ForeignLists')
	.populate('Tasks')
	.exec(function(err,users){
		//err? next(new Error):
		res.send(users);
	});
};
exports.edit=function(req, res, next) {
	User.findOneAndUpdate({mail:req.params.mail},
		{mail:req.body.mail,password:req.body.password},function(err,user){
			if(err){
				console.log('got an error')
			}
			res.send(user);
		})
	// User.find({mail:req.params.mail},function(err,user){
	// 	//err? next(new Error):
	// 	user.mail=req.body.mail;
	// 	user.password=req.body.password;
	// 	user.save(function (err, user) {
	// 	  if (err) return console.error(err);
	// 	  res.json(user);
	// 	});
		
	// });
};
exports.removeOne=function(req, res, next) {
	User.remove({mail:req.params.mail},function(err,user){
		res.send('User "'+user.mail+'" removed.');
	})
	
};