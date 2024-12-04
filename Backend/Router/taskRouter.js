const express=require('express');
const {registerUserTaskFunction,getAllTaskFunction,editUserTaskFunction,getExpiredTasks}=require('../Controller/taskController')
const router = express.Router();
router.post('/taskEntry',registerUserTaskFunction);
router.get('/getAllTask',getAllTaskFunction);
router.put('/editTask/:id',editUserTaskFunction);
router.get('/expiredTasks',getExpiredTasks);
module.exports=router;