const express = require('express')
const Task = require('../models/task')
const router = new express.Router()



router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)
    try{
        await task.save()
        res.status(201).send(task)
    }catch(e){

        res.status(400).send(e)
    }
})

router.get('/tasks', async (req, res) => {
    try{
        const tasks = await Task.find({})
        res.status(201).send(tasks)
    }catch(e){
        res.status(500).send(e)
    }
})


router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id
 try{
    const task = await Task.findById(_id)
    if (!task){
        return res.status(404).send()
    }
    res.send(task)
 }catch(e){
     res.status(500).send()
 }  
})


router.patch('/tasks/:id',async (req,res)=>{

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

        const task = await Task.findById(req.params.id)

        updates.forEach((update)=>task[update]=req.body[update])




        //const task = await Task.findByIdAndUpdate(req.params.id, req.body,{new:true,runValidators:true})
        //if no users with  id
        if(!task){
            return res.status(404).send()
        }
        //send updated user data
        res.send(task)
        //server related or validation issue
    }catch(e){
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)

        if (!task) {
            res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router