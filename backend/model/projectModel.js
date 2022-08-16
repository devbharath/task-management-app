const mongoose=require('mongoose')

const project= new mongoose.Schema({
    projectname:{
        type:String,
        required:true
    },
    projectstart:{
        type:Date,
    },
    projectend:{
        type:Date, 
        required:true
    },
    description:{
        type:String,
       
    },
    team:{
        type:Array,
    },
    projectstatus:{
        type:String,
    },
    createdby:{
        type:String,
    }
})

const projects = mongoose.model("projects",project)
module.exports=projects