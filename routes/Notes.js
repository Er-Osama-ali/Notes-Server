import express from 'express'
import { Create, Delete, GetNotes, UpdateNotes } from '../controllers/Notes.js'
import { VerfictionToken } from '../middlwares/Verfictiontoken.js'

const NotesRoutes = express.Router()
NotesRoutes.post('/createnote',VerfictionToken,Create)
NotesRoutes.put('/updateNotes/:id',VerfictionToken,UpdateNotes)
NotesRoutes.delete('/deleteNotes/:id',VerfictionToken,Delete)
NotesRoutes.get('/GetNotes',VerfictionToken,GetNotes)


export default NotesRoutes