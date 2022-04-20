const { MongoChangeStreamError } = require('mongodb')
const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
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
},{
    timestamps: true
})

const Task =  mongoose.model('Task',taskSchema)


module.exports = Task