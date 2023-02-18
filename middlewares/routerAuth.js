const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const routerAuth = async (req, res, next) => {
    
    const { authorization } = req.headers

    if(!authorization){
        return res.status(401).json({error : 'Authorization token is required on fetch'})
    }

    const token = authorization.split(' ')[1]

    // brearer jksdhvgudhbi.sjdfh

    try{
        const {_id} = jwt.verify(token, process.env.SECRET)
        req.user = await User.findOne({_id}).select(_id)

        if(!req.user._id){
            res.status(401).json({error : 'User not fouund in database'})
            return
        }
        console.log('jwt, token verified',_id)

        next()
    }catch (error){
        console.log('error in AUth' , error)

        res.status(401).json({error : 'Request is not Authorized'})
        return
    }


    
}

module.exports = routerAuth;