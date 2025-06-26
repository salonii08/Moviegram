import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext"; // adjust the path if needed

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const { currentUser } = useContext(AuthContext); // 👈 use AuthContext here

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!currentUser?._id) return;
      try {
        const res = await axios.get(`http://localhost:4000/api/favorites/${currentUser._id}`);
        console.log("Favorites response:", res.data);
        setFavoriteMovies(res.data.map(item => item.movieData));
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, [currentUser]);

  const addToFavorites = async (movie) => {
    if (!currentUser?._id) return;
    try {
      await axios.post("http://localhost:4000/api/favorites", {
        userId: currentUser._id,
        movieId: movie.id,
        movieData: movie,
      });
      setFavoriteMovies(prev => [...prev, movie]);
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  const removeFromFavorites = async (movieId) => {
    if (!currentUser?._id) return;
    try {
      await axios.delete(`http://localhost:4000/api/favorites/${currentUser._id}/${movieId}`);
      setFavoriteMovies(prev => prev.filter(movie => movie.id !== movieId));
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };

  const isFavorite = (movieId) => {
    return favoriteMovies.some((fav) => fav.id === movieId);
  };

  return (
    <FavoritesContext.Provider
      value={{ favoriteMovies, addToFavorites, removeFromFavorites, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
