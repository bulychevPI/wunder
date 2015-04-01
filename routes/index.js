var express = require('express');
var router = express.Router();
var passport=require('passport');
var IndexCtrl=require('../controllers/IndexCtrl');



router.post('/signup', IndexCtrl.passportLocalSignup); 

router.get('/private', IndexCtrl.getAuthUser);
router.get('/signup', IndexCtrl.getSignUpMessage);

router.post('/login', IndexCtrl.passportLocalLogin);

router.get('/login', IndexCtrl.getLogInMessage);
router.get('/loggedin', IndexCtrl.loggedIn);
router.get('/logout', IndexCtrl.logout);


module.exports = router;
