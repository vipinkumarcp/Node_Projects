const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req,res,next)=>{

    try{

        //removing bearer part with replace method
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token,'thisismynewcourse')
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        
        if (!user){
            throw new Error()
        }

        req.token = token
        req.user = user
        //route handle can acess later

        next()

    }catch(e){
        res.status(401).send({error:'Please authenicate'})
    }
  

}

module.exports = auth