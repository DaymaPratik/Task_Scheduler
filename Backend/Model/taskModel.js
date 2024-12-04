const mongoose=require('mongoose');
const userTaskSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    date:{
        type:String,
    },
    time:{
        type:String,
    },
    taskStatus:{
        type:String,
    }
})
const userTaskModel=mongoose.model('User_Task_Data',userTaskSchema);
module.exports=userTaskModel;