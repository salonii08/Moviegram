import mongoose from "mongoose";

const FavoriteSchema = new mongoose.Schema({
    userId:{
      type: mongoose.Schema.Types.ObjectId,
      require:true,
      ref: "user",
    },
    movieId: {
    type: Number, // TMDB movie ID
    required: true,
  },
  movieData: {
    type: Object, // Store relevant movie info
    required: true,
  },
});
export default mongoose.model("Favorite",FavoriteSchema);