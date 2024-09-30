import mongoose from 'mongoose'

const NotesShcema = mongoose.Schema({
    title:{
        type:String
    },
    userId:{
        type:String
    }
},{
    timestamps:true
})

const NotesModel = mongoose.model('Notes',NotesShcema)
export default NotesModel