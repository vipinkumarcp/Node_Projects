const mongoose = require('mongoose')
require('dotenv').config()


mongoose.connect(process.env.MONGODB_URL,{

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