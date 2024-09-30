import UserModel from "../models/Auth.js"
import bycript from "bcryptjs"
import jwt from 'jsonwebtoken'

const Register = async(req,res)=>{
    try {
        const{userName,email,password} = req.body
        if(!userName || !email || !password){
            return res.status(303).json({success:false,message:"All filde are required"})

        }
        const exitingUser = await UserModel.findOne({email})
        if(exitingUser){
            return res.status(303).json({success:false,message:"User already exist plese Login"})
        }
        const hasepassword=await bycript.hashSync(password,10)
        const NewUser = new UserModel({
            userName,email,password:hasepassword
        })
        NewUser.save()
        res.status(200).json({success:true,message:"User Register Successfully",User:NewUser})
         
       
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false,message:"Internnal Server Error"})
    }
}

const Login = async(req,res)=>{
    try {
       const {email,password} = req.body
       const FindUser = await UserModel.findOne({email})
       if(!FindUser){
        return res.status(404).json({success:false,message:"User Not Found please Register"})
       }
       const cpmparepassword = await bycript.compare(password,FindUser.password)
       if(!cpmparepassword){
        return res.status(303).json({success:false,message:"Invalid Password"})
       }

      const token = await jwt.sign({userId:FindUser._id},process.env.SecreateKey,{expiresIn:"3d"})
      res.cookie("token",token,{
        httpOnly:true,
        secure:false,
        maxAge:3 * 24 * 3600 *1000
      })

       res.status(200).json({success:true,message:"Login successfully",user:FindUser,
        token
       })
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false,message:"Internnal Server Error"})
    }
}

const Logout = async(req,res)=>{
    try {
        res.clearCookie('token')
        res.status(200).json({success:true,message:"User Logout successfully"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false,message:"Internnal Server Error"})
    }
}

export {Register,Login,Logout}