// controllers/favoriteController.js
import Favorite from "../Models/FavoriteModel.js";

export const getFavorites = async (req, res) => {
  const { userId } = req.params;
  try {
    const favorites = await Favorite.find({ userId });
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch favorites" });
  }
};

export const addFavorite = async (req, res) => {
  const { userId, movieId, movieData } = req.body;
  try {
    const existing = await Favorite.findOne({ userId, movieId });
    if (existing) return res.status(400).json({ message: "Already in favorites" });

    const favorite = await Favorite.create({ userId, movieId, movieData });
    res.status(201).json(favorite);
  } catch (error) {
    res.status(500).json({ error: "Failed to add favorite" });
  }
};

export const removeFavorite = async (req, res) => {
  const { userId, movieId } = req.params;
  try {
    await Favorite.findOneAndDelete({ userId, movieId });
    res.json({ message: "Removed from favorites" });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove favorite" });
  }
};
