const userTaskModel=require('../Model/taskModel');
const moment = require('moment');

// const sortedTasks = (tasks)=>{
//     tasks.sort((a, b) => {
//         const dueDateA = new Date(a.dueDate);
//         const dueDateB = new Date(b.dueDate);
      
        
//         if (dueDateA < currentDate && dueDateB < currentDate) {
//           return dueDateB - dueDateA; 
//         } else if (dueDateA < currentDate) {
//           return -1; 
//         } else if (dueDateB < currentDate) {
//           return 1; 
//         }
      
//         return dueDateA - dueDateB; 
//       });
// }
const registerUserTaskFunction=async (req,res)=>{
const {name,email,date,time,taskStatus}=req.body;
if(!(name && email && date && time && taskStatus)){
  return  res.status(400).json({
    message:"all field required"
  })
} 
try {
 
    const newlyCratedUserTask=await userTaskModel.create({
     name,
     email,
     date,
     time,
     taskStatus
    }); 
   return res.status(200).json({
     message:"Register user task successfully",
     userObj:newlyCratedUserTask,
   })
 } catch (error) {
     return res.json({
         status:false,
         message:"Error while creating user task"
  })
 }
}
const getAllTaskFunction=async (req,res)=>{
    try {
        const pendingTasks = await userTaskModel.find();
        // sortedTasks(pendingTasks);
        res.status(200).json({ pendingTasks });
    } catch (error) {
        console.log("Error in backend while getting all the task",error);
        
    }
}

const editUserTaskFunction = async (req, res) => {
    const { id } = req.params; // Task ID from the request parameters
    const { name, email, date, time } = req.body; // Fields to update

    if (!id) {
        return res.status(400).json({
            message: "Task ID is required",
        });
    }

    try {
        const updatedTask = await userTaskModel.findByIdAndUpdate(
            id,
            { name, email, date, time }, // Fields to update
            { new: true, runValidators: true } // Return the updated document
        );

        if (!updatedTask) {
            return res.status(404).json({
                message: "Task not found",
            });
        }

        return res.status(200).json({
            message: "Task updated successfully",
            updatedTask,
        });
    } catch (error) {
        console.error("Error while updating task:", error);
        return res.status(500).json({
            message: "Error while updating task",
            error: error.message,
        });
    }
};


const getExpiredTasks = async (req,res) => {
    const tasks = await userTaskModel.find(); // Assuming you have a Task model
    const currentDate = moment();
    const expiredTasks = tasks.filter(task => {
        const dueDate = moment(task.date); 
        return dueDate.isBefore(currentDate); 
    });

    return res.status(200).json(expiredTasks);
};
  module.exports={registerUserTaskFunction,getAllTaskFunction,editUserTaskFunction,getExpiredTasks};



