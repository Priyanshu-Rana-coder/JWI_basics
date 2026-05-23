

const jwt = require('jsonwebtoken')

const CustomAPIError=require('../errors/custom-error')
const login =async(req,res)=>{
    const {username,password}=req.body
    if (!username || !password){
        throw new CustomAPIError('please provide email password',400)
    }
    const id=new Date().getDate()

    const token=jwt.sign({id,username},process.env.JWT_SECRET,{expiresIn:'30d'})

    res.status(200).json({msg:'User created','token':token})
}
 
const dashboard= async(req,res)=>{
    const authHeader=req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')){
        throw new CustomAPIError('No token provided',400) 
    }
    const token=authHeader.split(' ')[1]
    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
    } catch (error) {
        throw new CustomAPIError('No token provided',400) 
    }


    const luckyNumber=Math.floor(Math.random()*100)
    res.status(200).json({msg:`Hello, John Doe`, secret:`Here is your lcuky number ${luckyNumber}`})
}

module.exports={login,dashboard}