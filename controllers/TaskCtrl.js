var List= require('../models/List').model;
var Task= require('../models/Task').model;
var User= require('../models/User').model;


//POST    /tasks
//l_id :    id of the list
//header:   header of the task
exports.postTask=function(req,res,next) {
	List.findOne({_id:req.body.l_id, owner: req.body.owner},function(err,list){
		console.log(list);
		if(err) res.end(err);
		Task.create({
			header:req.body.header,
			limited: false,
			owner: req.user.mail
			// done:false,
		},function(err,task){
			if(err)res.send(err);
			list.Tasks.push(task._id);
			list.save(function(err){
				if(err)res.send(err);
			});
			res.send(task);
		});
	});
};



//Put    /tasks
// t_id:   216854dfs45df
//header:
//done : true
// dueDate:  12.12.2015
// desc :    description
//newSubTasks: [{done:boolean,text:string}]
exports.editTask=function(req,res,next) {
	Task.findOne({_id:req.body.t_id},function(err,task){
		if(req.body.header) {task.header=req.body.header;}
		if(req.body.dueDate) {
			task.dueDate=new Date(req.body.dueDate);
			task.limited=true;
		}
		if(req.body.dueDate==null){
			task.dueDate=undefined;
			task.limited=false;
		}
		if(req.body.desc) {task.desc=req.body.desc;}
		if(req.body.done!=='undefined') {task.done=req.body.done}
		if(req.body.newSubTasks) {task.subTasks=req.body.newSubTasks;}
		if(req.body.limited==false) {task.limited=false;task.dueDate=undefined;}
		task.save();
		res.send(task);
	});
};

// POST     /tasks/:mail    --mail of user to assign
//t_id:    id of the task

exports.assignTask=function(req,res,next) {
	User.findOne({mail:req.params.mail},function(err,user){
		if(err) res.end(err);
		if(user.ForeignTasks.length==0){
			List.create({
				name: "ForeignTasks",
				description:"assigned tasks"
			},function(err,list){
				user.ForeignTasks.push(list._id);
				user.save();
				list.Tasks.push(req.body.t_id);
				list.save();
			});
		}
		else{
			List.findOne({_id:user.ForeignTasks[0]._id},function(err,list){
				list.Tasks.push(req.body.t_id);
			});	
		}

	});
};


// GET     /tasks/week    

exports.getWeekTasks=function(req,res,next) {
	var weekTasks=[];
	var deadline= new Date();
	var weekTasksList=new List();
	deadline.setDate(deadline.getDate()+7);
		User.findOne({_id: req.user._id})
		.populate('MyLists')
		.populate('ForeignLists')
		.exec(function(err,user){
			user.MyLists.forEach(function(list){
				list.populate('Tasks',function(err,list){
					list.Tasks.forEach(function(task){
						if(task.dueDate){

							var date=task.dueDate.getTime();
							if((date-deadline)<0) {
								task.type="MyLists";
								task.fromList=list._id;
								weekTasks.push(task);
							}
						}
					});
				});
			});



			user.ForeignLists.forEach(function(list){
				list.populate('Tasks',function(err,list){
					list.Tasks.forEach(function(task){
						if(task.dueDate){

							var date=task.dueDate.getTime();
							if((date-deadline)<0) {
								task.type="ForeignLists";
								task.fromList=list._id;
								weekTasks.push(task);
							}
						}
					});
				});
			});
			res.send(weekTasks);
		});
		

};



// DELETE     /tasks/    
//t_id:    id of the task to delete
exports.deleteTask=function(req,res,next) {
	User.findOne({_id: req.user._id}).populate('MyLists ForeignLists ForeignTasks')
	.exec(
		function(err,user){
		var t_id=req.query.t_id;
		user.MyLists.forEach(function(list){
			if(list.Tasks.indexOf(t_id)!== (-1)){
				
				list.Tasks.pull(t_id);
				list.save();
				User.find({}).populate('ForeignLists ForeignTasks',function(err,user){

					user.ForeignLists.forEach(function(list){
						if(list.Tasks.indexOf(t_id)!== (-1)){
							list.pull(t_id);
							list.save();
						}
					});
					if(user.ForeignTasks[0].Tasks.indexOf(t_id)!== (-1)){
						user.ForeignTasks[0].Tasks.pull(t_id);
						user.ForeignTasks[0].save();
					}
				});
				Task.remove({_id:t_id},function(err){
					if (err) res.end(err);
					res.send("Task is removed from MyLists");
				});
			}
		});
		user.ForeignLists.forEach(function(list){
			if(list.Tasks.indexOf(t_id)!== (-1)){
				list.Tasks.pull(t_id);
				list.save();
				res.send(200);
			}
		});
		if(user.ForeignTasks.length!==0){
			if(user.ForeignTasks[0].Tasks.indexOf(t_id)!== (-1)){
				user.ForeignTasks[0].Tasks.pull(t_id);
				user.ForeignTasks[0].save();
				if(user.ForeignTasks[0].Tasks.length==0){
					List.remove({_id:user.ForeignTasks[0]._id},function(err){
						if(err)res.end(err);
						user.ForeignTasks.splice(0,1);
					});
				}
				res.send(200);
			}
		}
		
	});


};

// Get     /:l_id    --id of the list with tasks

exports.getTasks=function(req,res,next) {
	List.findOne({_id:req.query.l_id})
		.populate('Tasks')
		.exec(function(err,list){
			res.send(list);
		});
};