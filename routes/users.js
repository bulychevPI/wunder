var express = require('express');
var router = express.Router();
var UserCtrl= require('../controllers/UserCtrl');

/* GET users listing. */
router.get('/', UserCtrl.read); //contemp
router.post('/new_user', UserCtrl.add);
router.get('/:mail',UserCtrl.readOne);
router.put('/:mail',UserCtrl.edit);
router.get('/remove/:mail',UserCtrl.removeOne);
module.exports = router;
