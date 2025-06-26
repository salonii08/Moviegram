import express from 'express'
import { deleteMovie, getAllMovies, getMovie, postMovie, updateMovie } from '../Controllers/PostController.js'
import { verifyToken } from '../Middleware/verifyToken.js'

const router = express.Router()
    
router.post('/',verifyToken,postMovie)
router.get('/',verifyToken,getAllMovies)
router.get('/:id',getMovie)
router.delete('/:id',deleteMovie)
router.put("/:id", updateMovie)


export default router;