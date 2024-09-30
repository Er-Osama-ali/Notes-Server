import jwt from 'jsonwebtoken'
import UserModel from '../models/Auth.js'

const VerfictionToken = async(req,res,next)=>{
    try {
      const token = req.cookies.token
      if(!token){
        return res.status(303).json({success:false,message:"Unauthorized please login"})
      }
      const decoded = await jwt.decode(token,process.env.SecreateKey)
      const user =  await UserModel.findById(decoded.userId)
      if(!user){
        return res.status(404).json({success:false,message:"User Not Found"})
      }
    req.userId = user._id
    next()
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:"Internal Server Error"})
    }
}

export {VerfictionToken}