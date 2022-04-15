require('../src/db/mongoose')

const Task = require('../src/models/Task')

//62569c3f6a0e7064dcd30fda
// Task.findByIdAndDelete('62569c3f6a0e7064dcd30fda').then((task)=>{

//     console.log(task)

//     return Task.countDocuments({completed: false})
// }).then((result)=>{
//     console.log(result)
// }).catch((e)=>{
//     console.log(e)
// })


const deleteTaskAndCount = async (id)=>{
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed:false})

    return count
}

deleteTaskAndCount('6256ddf0512012750c18f26e').then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})