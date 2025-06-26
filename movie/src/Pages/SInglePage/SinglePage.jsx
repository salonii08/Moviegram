import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { getMovieDetails } from "../../Services/api";
import { useContext } from "react";
import { FavoritesContext } from "../../Context/FavoriteContext";

const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";
const BASE_BACKDROP_URL = "https://image.tmdb.org/t/p/w780";
const FALLBACK_IMAGE =
  "https://via.placeholder.com/500x750?text=Oops!+No+Image+Found+🥺";

 

const SinglePage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchDetails();
  }, [id]);

  if (!movie) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  const cast = movie.credits?.cast?.slice(0, 6);

   const { addToFavorites, removeFromFavorites, isFavorite } = useContext(FavoritesContext);
   const isFav = isFavorite(movie.id);

   const handleFavorite = () => {
   if (isFav) {
    removeFromFavorites(movie.id);
   } else {
    addToFavorites(movie);
   }
};


  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen text-white p-6 md:p-10 bg-gradient-to-br from-black via-gray-900 to-black"
    >
      <div className="flex flex-col md:flex-row items-start gap-8 max-w-6xl mx-auto">
        {/* Poster Image */}
        <motion.div
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          className="rounded-lg shadow-xl w-full md:w-1/3 overflow-hidden"
        >
          <img
            src={
              movie.poster_path
                ? `${BASE_IMAGE_URL}${movie.poster_path}`
                : FALLBACK_IMAGE
            }
            alt={movie.title}
            className="w-full h-full object-cover"
            onError={(e) => (e.target.src = FALLBACK_IMAGE)}
          />
        </motion.div>

        {/* Movie Info */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
          <p className="text-gray-400 text-sm mb-4">{movie.release_date}</p>
          <button onClick={handleFavorite} className={`mt-2 px-4 py-2 rounded-full ${
           isFav ? "bg-red-600 text-white" : "bg-gray-700 text-white" } hover:scale-105 transition-transform duration-200`}>
           {isFav ? "❤️ Remove from Favorites" : "🤍 Add to Favorites"}
          </button>

          <p className="text-gray-200 mb-4 leading-relaxed">{movie.overview || "No description available."}</p>

          <div className="text-sm space-y-1 mb-4">
            <p>⭐ Rating: {movie.vote_average} / 10</p>
            <p>⏱ Runtime: {movie.runtime} minutes</p>
          </div>

          {/* Genres */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">🎬 Genres</h2>
            <div className="flex flex-wrap gap-2">
              {movie.genres?.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-blue-700/80 px-3 py-1 text-sm rounded-full"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
        


          {/* Cast */}
          {cast?.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-2">🎭 Top Cast</h2>
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {cast.map((actor) => (
                  <div key={actor.id} className="w-24 text-center">
                    <img
                      src={
                        actor.profile_path
                          ? `${BASE_IMAGE_URL}${actor.profile_path}`
                          : "https://via.placeholder.com/100x150?text=No+Image"
                      }
                      alt={actor.name}
                      className="rounded-md w-24 h-36 object-cover mb-1"
                    />
                    <p className="text-sm truncate">{actor.name}</p>
                  </div>
                ))}
               
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Backdrop or Overlay */}
      {movie.backdrop_path && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[-1]"
          style={{
            backgroundImage: `url(${BASE_BACKDROP_URL}${movie.backdrop_path})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(10px) brightness(0.4)",
          }}
        ></motion.div>
      )}
    </motion.div>
  );
};

export default SinglePage;
