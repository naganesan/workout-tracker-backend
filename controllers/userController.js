const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (id) => {
    return jwt.sign({_id : id }, process.env.SECRET, {expiresIn: '1d'} )
}

async function loginUser (req, res) {
    const { email , password } = req.body

    try{
        const user = await User.login(email, password)
       
        // creating token
        const token = createToken(user._id)

        res.status(200).json({email,token})

    } catch (error) {
        res.status(400).json({error : error.message})
    }
}


async function signupUser (req, res) {
    const { email , password } = req.body


    try {
        const user = await User.signUp(email,password)

        // creating token
        const token = createToken(user._id)

        res.status(200).json({email,token})
    } catch (error) {
        res.status(400).json({error : error.message})
    }

}


module.exports = {loginUser, signupUser}