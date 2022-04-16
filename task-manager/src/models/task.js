const mongoose = require('mongoose')



const Task =  mongoose.model('Task',{
    description:{
        type:String,
        required: true,
        trim:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    //linking the user created the task
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        //modelname
        ref:'User'
    }
})


module.exports = Task