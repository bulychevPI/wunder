var express = require('express');
var router = express.Router();
var ListCtrl= require('../controllers/ListCtrl');


router.get('/',ListCtrl.getAllLists);
router.post('/',ListCtrl.postList);
module.exports = router;