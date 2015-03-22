var express = require('express');
var router = express.Router();
var TaskCtrl= require('../controllers/TaskCtrl');


router.post('/',TaskCtrl.postTask);
router.get('/week',TaskCtrl.getWeekTasks);
router.get('/:l_id',TaskCtrl.getTasks);
router.put('/',TaskCtrl.editTask);
router.post('/:mail',TaskCtrl.asignTask);

module.exports = router;