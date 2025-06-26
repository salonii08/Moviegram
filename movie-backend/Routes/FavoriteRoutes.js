import { addFavorite, getFavorites, removeFavorite } from "../Controllers/FavoriteController.js";
import express from 'express'


const router = express.Router()

router.get("/:userId",getFavorites);
router.post("/",addFavorite);
router.delete("/:userId/:movieId",removeFavorite);

export default router;