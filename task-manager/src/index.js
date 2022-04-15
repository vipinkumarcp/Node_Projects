const express = require('express')
require("./db/mongoose")
const User = require('./models/user')
const Task = require('./models/task')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')


const app = express()

const port = process.env.PORT || 3000
//middleware-function run before request send to route

// new-request -> do something ->run route handler
// app.use((req,res,next)=>{
//  console.log(req.method,req.path)


//  //to next thread
//  next()

// })

//automatical parse incoming json
app.use(express.json())

//registering user router

app.use(userRouter,taskRouter)



app.listen(port, () => {

    console.log('Server is up on port' + port)

})

const jwt = require('jsonwebtoken')

const myFunction = async()=>{

   const token =jwt.sign({_id:'abc123'},'thisismynewcourse',{expiresIn:'7 days'})
   console.log(token)

   const data = jwt.verify(token,'thisismynewcourse')
   console.log(data)
}

myFunction()