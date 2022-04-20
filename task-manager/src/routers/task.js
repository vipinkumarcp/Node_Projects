const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()



router.post('/tasks',auth, async (req, res) => {
    // const task = new Task(req.body)
    const task = new Task({

        //spread operator to copy all the properties
        ...req.body,
        //owner from auth token
        owner:req.user._id
       

    })
  
    try{
        await task.save()
        res.status(201).send(task)
    }catch(e){

        res.status(400).send(e)
    }
})



// GET /tasks?completed=true
// GET /tasks?limit=10&skip=20
// GET /tasks?sortBy=createdAt:desc
router.get('/tasks',auth, async (req, res) => {

    //to fetch query string value
    const match = {}
    // -1 for desc and 1 for asc
    const sort = {}
    if (req.query.completed){
        match.completed = req.query.completed === 'true'
    }
    if (req.query.sortBy){
        //spliting special character
        const parts = req.query.sortBy.split(':')
        //grabing first item in parts array
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try{
        //const tasks = await Task.find({owner:req.user._id})
        //await req.user.populate('tasks')
        await req.user.populate({
            path:'tasks',
            match,
            options:{
                //ignored when no number is provided
                limit:parseInt(req.query.limit),
                skip:parseInt(req.query.skip),
                sort
            }
        })
        res.send(req.user.tasks)

    }catch(e){
        res.status(500).send(e)
    }
})


router.get('/tasks/:id',auth, async (req, res) => {
    const _id = req.params.id
 try{
    //const task = await Task.findById(_id)
    const task = await Task.findOne({_id,owner:req.user._id})

    if (!task){
        return res.status(404).send()
    }
    res.send(task)
 }catch(e){
     res.status(500).send()
 }  
})


router.patch('/tasks/:id',auth,async (req,res)=>{

    //keys willl return object of the
    const updates = Object.keys(req.body)

    //only which property can be updated
    const allowdUpdates = ['description','completed']
    //return true
    const isValidOperation = updates.every((update)=>{
        return allowdUpdates.includes(update)
    })
    if (!isValidOperation){
        return res.status(400).send({error:'Invalid Updates'})
    }
    try{

        const task = await Task.findOne({_id:req.params.id, owner: req.user._id})
        //const task = await Task.findById(req.params.id)

       




        //const task = await Task.findByIdAndUpdate(req.params.id, req.body,{new:true,runValidators:true})
        //if no users with  id
        if(!task){
            return res.status(404).send()
        }
        updates.forEach((update)=>task[update]=req.body[update])
        await task.save()
        //send updated user data
        res.send(task)
        //server related or validation issue
    }catch(e){
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id',auth, async (req, res) => {
    try {
       // const task = await Task.findByIdAndDelete(req.params.id)

        const task = await Task.findOneAndDelete({_id:req.params.id,owner:req.user._id})
        if (!task) {
            res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router