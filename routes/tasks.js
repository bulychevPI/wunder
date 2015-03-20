var express = require('express');
var router = express.Router();
var TaskCtrl= require('../controllers/TaskCtrl');


router.post('/',TaskCtrl.postTask);
router.get('/:l_id',TaskCtrl.getTasks);
module.exports = router;