
require('../src/db/mongoose')

const User = require('../src/models/user')

//c625698de8d2801f1c64d742d

// User.findByIdAndUpdate('625698de8d2801f1c64d742d',{age:1}).then((user)=>{
//     console.log(user)

//     return User.countDocuments({age:1})
// }).then((result)=>{
//     console.log(result)
// }).catch((e)=>{

//     console.log(e)
// })

const updateAgeAndCount = async(id,age)=>{

    const user = await User.findByIdAndUpdate(id,{age})
    const count = await User.countDocuments({age})

    return count
}

updateAgeAndCount('625698de8d2801f1c64d742d',2).then((count)=>{

    console.log(count)

}).catch((e)=>{
    console.log(e)
})