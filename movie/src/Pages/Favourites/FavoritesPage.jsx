import React, { useContext } from "react";
import { FavoritesContext } from "../../Context/FavoriteContext"
import MovieCard from "../../components/Card/MovieCard";

const Favorites = () => {
  const { favoriteMovies } = useContext(FavoritesContext);

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10">
      <h1 className="text-4xl font-bold mb-8 text-center">🎬 Your Favorite Movies</h1>

      {favoriteMovies.length === 0 ? (
        <p className="text-gray-400 text-lg text-center mt-20">
          You haven’t added any favorites yet. Go pick some movies you love! 💖
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {favoriteMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        
      )}
      
    </div>
  );
};

export default Favorites;
