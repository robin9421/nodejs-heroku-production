const Task = require('../models/tasks')
const express = require('express')
const auth = require('../middlewares/auth')
const router = new express.Router()

router.get('/tasks', auth, async (req,res)=>{

    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try{
        var tasks = await Task.find({})
        res.send(tasks)
    } catch(error){
        res.status(500).send()
    }
})

router.get('/tasks/:id', async (req,res) =>{
    const _id = req.params.id

    try{
        var task = await Task.findById(_id)
        if(!task)
        {
            return res.status(404).send()
        }

        res.send(task)
    }catch(error){
        res.status(500).send()
    }
})

router.patch('/tasks/:id', async (req,res) =>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ["completed","description"]
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update));

    if(!isValidOperation)
    {
        return res.status(400).send({ error:"Invalid updates!!"});
    }
    try{
        const task = await Task.findById(req.params.id)
        updates.forEach((update)=> task[update] = req.body[update])
        await task.save()
         
        if(!task)
         {
             return res.status(404).send()
         }

         res.send(task)
    } catch(error){
        res.status(400).send(error)
    }
})


router.delete('/tasks/:id', async (req,res) =>{
    try{
        const task = await Task.findByIdAndDelete(req.params.id)

        if(!task)
        {
            return res.status(404).send()
        }

        res.send(task)
    }
    catch(error){
        res.status(500).send(error)
    }
})


router.post('/tasks', async(req,res) => {
    const task = new Task(req.body)

    try{
        await task.save()
        res.status(201).send(task)
    } catch(error){
        res.status(400).send(error)
    }
})

module.exports = router