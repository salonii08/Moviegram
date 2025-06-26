import express from "express"
import { deleteuser, getUser, getUsers, updateuser,  } from "../Controllers/UserController.js"
import { verifyTokenAndAuthorization } from "../Middleware/verifyToken.js"

const router = express.Router()


// router.post("/",newUser)
router.get('/',getUsers)
router.get('/:id',verifyTokenAndAuthorization, getUser)
router.delete('/:id',verifyTokenAndAuthorization, deleteuser)
router.put("/:id", verifyTokenAndAuthorization, updateuser)

export default router