const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const User = require('../models/user')
const auth = require('../middleware/auth')
const { route } = require('express/lib/application')
const router = new express.Router()






router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try{
        await user.save()
        const token = await user.generateAuthToken()
        
        //only run if promise above full filled
        res.status(201).send({user,token})
    } catch(e){
        res.status(400).send(e)
    }
    //old code
    // user.save().then(() => {
    //     res.status(201).send(user)
    // }).catch((e) => {
    //     res.status(400).send(e)
    // })

})

//login
router.post('/users/login',async (req,res)=>{

    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        //onemethod to call fgetpublic profile
        //res.send({user:user.getPublicProfile(),token})
        res.send({user,token})
    }catch(e){
        res.status(400).send(e)
    }


})

//logout
router.post('/users/logout',auth,async(req,res)=>{

    try {

        console.log(req.user.tokens)
        
        req.user.tokens = req.user.tokens.filter((token)=>{
            //return true on current token false on not matching and removing from array
            return token.token !== req.token
        })

        await req.user.save()

        res.send()

    }catch(e){

        res.status(500).send()


    }

})


//to logout all session -wipe out tokens array
router.post('/users/logoutAll',auth,async(req,res)=>{

    try {

        req.user.tokens = []
        await req.user.save()
        res.send()

    }catch(e){

        res.status(500).send()


    }

})






//second argument is middleware and third argument is a request function
router.get('/users/me', auth, async (req, res) => {

    //this req.user already authenicated by middle ware send only user data
   res.send(req.user)
})
//fetching users by id


//disablin because users me serves same function
// router.get('/users/:id', async (req, res) => {
//     const _id = req.params.id
//     try {
//         const user = await User.findById(_id)
//         if(!user){
//             return res.status(404).send()
//         }
//         res.send(user)
//     }catch(e){
//         res.status(500).send()
//     }
//     //find by id quries
//     // User.findById(_id).then((user) => {
//     //     //mango db return nothing if no user so using conditional logic
//     //     if (!user) {
//     //         return res.status(404).send()
//     //     }
//     //     res.send(user)
//     // }).catch(() => {
//     //     res.status(500).send()
//     // })
// })

//updating users by id

router.patch('/users/me',auth,async (req,res)=>{
    //keys willl return object of the
    const updates = Object.keys(req.body)
    //only which property can be updated
    const allowdUpdates = ['name','email','password','age']
    //return true
    const isValidOperation = updates.every((update)=>{
        return allowdUpdates.includes(update)
    })
    if (!isValidOperation){
        return res.status(400).send({error:'Invalid Updates'})
    }
    try{

        //to prevent mongoose direct bypass to prevent database update and middle ware running
        //const user = await User.findByIdAndUpdate(req.params.id)



        updates.forEach((update)=>{
            //acess property dynamically
            req.user[update] = req.body[update]

        })

        await req.user.save()

        //const user = await User.findByIdAndUpdate(req.params.id, req.body,{new:true,runValidators:true})
        //if no users with  id
        // if(!user){
        //     return res.status(404).send()
        // }
        //send updated user data
        res.send(req.user)
        //server related or validation issue
    }catch(e){
        res.status(400).send(e)
    }
})

//autentication medileware 
router.delete('/users/me',auth, async (req, res) => {
    try {
        // const user = await User.findByIdAndDelete(req.user.__id)
        // if (!user) {
        //     return res.status(404).send()
        // }
        //using remove method mangoose 
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

//upload profile pic

const upload = multer({
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){
        if (!file.originalname.match(/\.(jpg|jpeg|png)/)){
            return cb(new Error('Please upload an image'))
        }

        cb(undefined,true)
    }

})

router.post('/users/me/avatar',auth,upload.single('avatar'),async (req,res)=>{
    //acess the data inside through multer
    //orginal image is converted by sizng sharp

    const buffer = await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()
    req.user.avatar = buffer
    //validated data is passed here
    //req.user.avatar = req.file.buffer
    //save
    await req.user.save()
    res.send()
},(error,req,res,next)=>{
    res.status(400).send({error: error.message})
})

//delete image

router.delete('/users/me/avatar',auth,async(req,res)=>{
        req.user.avatar = undefined
        await req.user.save()
        res.send()
})

//fetching image back

router.get('/users/:id/avatar',async (req,res)=>{

    try{

        const user = await User.findById(req.params.id)
        //if there is no user or avatar image is not there
        if(!user || !user.avatar){

            throw new Error()
        }
        //telling which image format to user
        //setting header 
        res.set('Content-Type','image/png')
        res.send(user.avatar)


    }catch(e){
        res.status(404).send()
    }


})

module.exports = router