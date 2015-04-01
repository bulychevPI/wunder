var passport=require('passport');
exports.passportLocalSignup=passport.authenticate('local-signup',
	{
		// successRedirect: '/private',
		successRedirect: '/',
		failureRedirect : '/signup',
		failureFlash : true // allow flash messages
	});
exports.getAuthUser=function(req,res){
	res.redirect('/users/'+req.user.mail);
};
exports.getSignUpMessage=function(req,res){
	res.redirect('/');
	// res.send(req.flash('signupMessage'));
};

exports.passportLocalLogin=passport.authenticate('local-login', {
        // successRedirect : '/private', // redirect to the secure profile section
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the login page if there is an error
        failureFlash : true // allow flash messages
});
exports.getLogInMessage=function(req,res){
	res.redirect('/');
	// res.send(req.flash('loginMessage'));
};
exports.loggedIn=function(req, res) {
  res.send(req.isAuthenticated() ? req.user : '0');
 
};

exports.logout=function(req,res){
	req.logout();
	res.redirect('/');
};