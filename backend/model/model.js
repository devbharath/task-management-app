const mongoose=require('mongoose')

const employee= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    empid:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    adminrequest:{
        type:Boolean,
       
    },
    adminstatus:{
        type:Boolean,
    }
})

const employees = mongoose.model("employees",employee)
module.exports=employees