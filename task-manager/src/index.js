const express = require('express')
require("./db/mongoose")
const User = require('./models/user')
const Task = require('./models/task')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
require('dotenv').config()

//regex101.com
const app = express()

const port = process.env.PORT


// const multer = require('multer')
// const upload = multer({

//     dest:'images',
//     limits:{
//         fileSize:1000000
//     },
//     fileFilter(req,file,cb){
//         //if not pdf  reject
//         //  //match allow us to check regualr expression in forward slashes
//         if(!file.originalname.match(/\.(doc|docx)/)){

//             return cb(new Error('File must be word'))
//         }
//         //first arg  is error
//         cb(undefined,true)
//         //cb is call back-if something got wrong 
//         // cb(new Error('File must be a PDF'))
//         // //if everything went well
//         // cb(undefined,true)
//         // cb(undefined,false)
//     }

// })

// //middleware upload is name
// app.post('/upload',upload.single('upload'),(req,res)=>{
//     res.send()
// },//if any error came this express setup
// (error,req,res,next)=>{
//     res.status(400).send({error: error.message})
// })


app.use(express.json())

//registering user router

app.use(userRouter,taskRouter)



app.listen(port, () => {

    console.log('Server is up on port' + port)

})




