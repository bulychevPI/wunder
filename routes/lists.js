var express = require('express');
var router = express.Router();
var ListCtrl= require('../controllers/ListCtrl');


router.get('/',ListCtrl.getAllLists);
router.post('/',ListCtrl.postList);
router.post('/asign',ListCtrl.asignListToUser);
router.delete('/',ListCtrl.deleteList);
router.put('/rename',ListCtrl.renameList);
module.exports = router;