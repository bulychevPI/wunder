var List= require('../models/List').model;
var Task= require('../models/Task').model;
var User= require('../models/User').model;


//POST    /tasks
//l_id :    id of the list
//header:   header of the task
exports.postTask=function(req,res,next) {
	List.findOne({_id:req.body.l_id, owner: req.user._id},function(err,list){
		if(err) res.end(err);
		Task.create({
			header:req.body.header,
			limited: false,
			owner: req.user._id
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
// dueDate:  12.12.2015
// desc :    description
//newSubTask: [{done:boolean,text:string}]
exports.editTask=function(req,res,next) {
	Task.findOne({_id:req.body.t_id},function(err,task){
		if(req.body.header) {task.header=req.body.header;}
		if(req.body.dueDate) {task.dueDate=new Date(req.body.dueDate); task.limited=true;}
		if(req.body.desc) {task.desc=req.body.desc;}
		if(req.body.newSubTask) {task.subTasks=req.body.newSubTask;}
		if(!task.dueDate) {task.limited=false;}
		task.save();
		res.send(task);
	});
};

// POST     /tasks/:mail    --mail of user to asign
//t_id:    id of the task

exports.asignTask=function(req,res,next) {
	User.findOne({mail:req.params.mail},function(err,user){
		if(err) res.end(err);
		user.ForeignTasks.push(req.body.t_id);
		user.save(function(err){
			res.send('asigned');
		});
	});
};


// GET     /tasks/week    

exports.getWeekTasks=function(req,res,next) {
	var weekTasks=[];
	var deadline= new Date();
	deadline.setDate(deadline.getDate()+7);
	Task.find({owner:req.user._id,limited:true})
		.exec(function(err,tasks){
			if(err) res.end(err);
			tasks.forEach(function(task){
				var date=task.dueDate.getTime();

				if((date-deadline)<0) {weekTasks.push(task);}

		});
	});
	
	User.findOne({_id: req.user._id})
		.populate('ForeignLists')
		.exec(function(err,user){
			user.ForeignLists.forEach(function(list){
				list.populate('Tasks',function(err,list){
					list.Tasks.forEach(function(task){
						var date=task.getTime();
						if((date-deadline)<0) {weekTasks.push(task);}
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
		console.log(user);
		user.MyLists.forEach(function(list){
			if(list.Tasks.indexOf(req.body.t_id)!== (-1)){
				console.log("1");
				list.Tasks.pull(req.body.t_id);
				list.save();
				User.find({}).populate('ForeignLists ForeignTasks',function(err,user){

					user.ForeignLists.forEach(function(list){
						if(list.Tasks.indexOf(req.body.t_id)!== (-1)){
							list.pull(req.body.t_id);
							list.save();
						}
					});
					if(user.ForeignTasks.indexOf(req.body.t_id)!== (-1)){
						user.ForeignTasks.pull(req.body.t_id);
						user.save();
					}
				});
				Task.remove({_id:req.body.t_id},function(err){
					if (err) res.end(err);
					res.send("Task is removed from MyLists");
				});
			}
		});
		user.ForeignLists.forEach(function(list){
			if(list.Tasks.indexOf(req.body.t_id)!== (-1)){
				list.Tasks.pull(req.body.t_id);
				lsit.save();
			}
		});
		if(user.ForeignTasks.indexOf(req.body.t_id)!== (-1)){
			user.ForeignTasks.pull(req.body.t_id);
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