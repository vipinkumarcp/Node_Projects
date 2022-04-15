const mongoose = require('mongoose')


mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{

    useNewUrlParser:true,
    // useCreateIndex:false
})










// const task = new Task({
//     description:'Learn the mogoose Library',
//     completed:false
// })

// task.save().then(()=>{

//     console.log(task)

// }).catch((error)=>{

//     console.log(error)














// //creating user instance

// const me = new User({
//     name: '   Andrew  ',
//     email: 'MYEMAIL@MEAD.IO   ',
//     password: 'phone098!'
// })


// //saving the string

// me.save().then(()=>{

//     console.log(me)

// }).catch((error)=>{

//     console.log('Error',error)

// })


// })