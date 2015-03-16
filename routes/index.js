var express = require('express');
var router = express.Router();
var passport=require('passport');
var IndexCtrl=require('../controllers/IndexCtrl');

/* GET home page. */
// router.get('/', function(req, res, next) {

//   res.redirect('/login');
// });
// router.get('/login', function(req, res, next) {
// 	res.render('login',{title:'LogIn'});
// });


// router.post('/login', passport.authenticate('local'),
// 	function(req, res,err) { 
		
// 		res.send(req.user); 
// 	}); 


router.get('/', function(req,res){
	res.redirect('index.html');
	// res.redirect('/privte');
});

router.post('/signup', IndexCtrl.passportLocalSignup); 

router.get('/private', IndexCtrl.getAuthUser);
router.get('/signup', IndexCtrl.getSignUpMessage);

router.post('/login', IndexCtrl.passportLocalLogin);

router.get('/login', IndexCtrl.getLogInMessage);
router.get('/loggedin', IndexCtrl.loggedIn);
router.get('/logout', IndexCtrl.logout);

module.exports = router;
