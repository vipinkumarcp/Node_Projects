
const bcrypt = require('bcryptjs/dist/bcrypt')
const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const Task= require('./task')
require('dotenv').config()



const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique:true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a postive number')
            }
        }
    },
    tokens:[{

        token:{
            type:String,
            required:true
        }

    }],
    avatar:{
        type: Buffer
    }
    
},{
    timestamps:true

})


//virutal property-relationship b/w two entities task and users
//way to mangoose to figure out how these things related

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})




// to remove uncessary data returning to user
// userSchema.methods.getPublicProfile = function(){
//     const user = this

//     //to object is mangoose method to return raw data
//     const userObject = user.toObject()

//     //delete doesn't want 
//     delete userObject.password
//     delete userObject.tokens

//     return userObject
// }

//another automated task for above mentioned method by toJSNON method.no need to call this method automatially get applied
//json called evey time when express request is called..

userSchema.methods.toJSON= function(){
    const user = this

    //to object is mangoose method to return raw data
    const userObject = user.toObject()

    //delete doesn't want 
    delete userObject.password
    delete userObject.tokens
    //delete send image back becuse it slow down the json responde
    delete userObject.avatar

    return userObject
}



userSchema.methods.generateAuthToken = async function(){

    const user = this
    //generate jwt
    const token = jwt.sign({_id:user._id.toString()},process.env.JWT_SECRET)

    //token shows to database
    user.tokens = user.tokens.concat({token})
    await user.save()

    return token
}



userSchema.statics.findByCredentials = async (email,password)=>{
     
        //find by email first

        const user = await User.findOne({email})

       // if no user with email
       if(!user){
           throw new Error('Unable to login')
       }

       const isMatch = await bcrypt.compare(password,user.password)

       if(!isMatch){
           throw new Error('Unable to login')
       }

       return user

}




//userSchema.pre to do something before (middle ware)
//userSchem.post to after something (middleware)

//userSchema.pre to do something before (middle ware)-agruments name of the event
//second function to run.normal function used arrow function doesnot bind this
userSchema.pre('save',async function(next){

    const user = this

    //if only user password has been changed otherwise no need to hash
    if (user.isModified('password')){

        user.password = await bcrypt.hash(user.password, 8)

    }

    //after the code done
    next()

    
})
//middileware to delet task if user deleted

userSchema.pre('remove',async function(next){
    const user = this
    await Task.deleteMany({owner:user._id})
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User