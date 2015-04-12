var express = require('express');
var router = express.Router();
var ListCtrl= require('../controllers/ListCtrl');


router.get('/',ListCtrl.getAllLists);
router.post('/',ListCtrl.postList);
router.post('/assign',ListCtrl.assignListToUser);
router.delete('/',ListCtrl.deleteList);
router.put('/',ListCtrl.renameList);
module.exports = router;