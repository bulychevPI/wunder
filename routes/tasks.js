var express = require('express');
var router = express.Router();
var TaskCtrl= require('../controllers/TaskCtrl');


router.post('/',TaskCtrl.postTask);
router.delete('/',TaskCtrl.deleteTask);
router.get('/week',TaskCtrl.getWeekTasks);

//?l_id=l_id
router.get('/',TaskCtrl.getTasks);
router.put('/',TaskCtrl.editTask);
router.post('/:mail',TaskCtrl.assignTask);

module.exports = router;