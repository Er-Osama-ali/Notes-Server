import mongoose from "mongoose";

const DbCon = async()=>{
    try {
        mongoose.connect(process.env.MONGODB_URL)
        console.log('MongoDb Is Connected')
    } catch (error) {
        console.log('Error in mongoDb Connection',error)
    }
}

export default DbCon