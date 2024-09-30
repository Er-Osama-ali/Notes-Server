import NotesModel from '../models/Notes.js'
const Create = async(req,res)=>{
    try {
        const userId = req.userId
        const {title}= req.body

        if(!title){
            return res.status(303).json({success:false,message:"Title are required"})
        }
        const NewNotes = new NotesModel({
            title, userId
        })
        await NewNotes.save()
        res.status(200).json({success:true,message:"Notes Created successfully",Notes:NewNotes})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false,message:"Internal Server error"})
    }
}

const UpdateNotes = async (req,res)=>{
    try {
        const userId=req.userId
        console.log(userId)
        const NotesId = req.params.id
        const {title} = req.body

        const FindeNotes = await NotesModel.findById({_id:NotesId})
        if(!FindeNotes){
          return res.status(404).json({success:false,message:"Notes Not found"})
        }
        
        const NotesuserId = FindeNotes.userId
        if(userId.toString() !==NotesuserId){
        return res.status(404).json({success:false,message:"Unauthorizes user"})

        }

       const updateNotes = await NotesModel.findByIdAndUpdate(
        {_id:NotesId},
        {title},{new:true}
       )
       res.status(200).json({success:true,message:"Notes update successfully",UpdateNotes})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false,message:"Internal Server error"})
    }
}

const Delete = async(req,res)=>{
    try {
        const userId=req.userId
        console.log(userId)
        const NotesId = req.params.id

        const FindeNotes = await NotesModel.findById({_id:NotesId})
        if(!FindeNotes){
            return res.status(404).json({success:false,message:"Notes Not found"})
        }
        const DeletedNotes = await NotesModel.findByIdAndDelete(NotesId)
        res.status(200).json({success:true,message:"Notes deleted successfully",DeletedNotes})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false,message:"Internal Server error"})
    }
}


const GetNotes = async(req,res)=>{
    try {
        const userId = req.userId

        const Notes = await NotesModel.find({userId})
        if(!Notes){
            return res.status(404).json({success:false,message:"No data found"})
  
        }
        res.status(200).json({success:true,Notes})

    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false,message:"Internal Server error"}) 
    }
}
export {Create,UpdateNotes,Delete,GetNotes}