import MovieModel from "../Models/MovieModel.js";

//Create a new movie
export const postMovie = async (req,res)=>{
    try {
        const movie = await MovieModel.create(req.body);
        res.status(201).json({
            success:true,
            message: 'Movie is created successfully',
            data:movie,
        });

    }catch (error){
        res.status(400).json({
            success:false,
            message:'Error creating movie',
            error:error.message,
        });
    }
};

//Get all movie
export const getAllMovies = async(req,res) => {
    try {
        const movies = await MovieModel.find()
        res.status(200).json({
            movies
        })
    } catch (error) {
        console.log(error)
    }
};

// get movies by id
 
export const getMovie = async (req,res) =>{
 try {
    const movie = await MovieModel.findById({_id:req.params.id});
    if(!movie){
    return res.status(404).json({
        success:true,
        message:"Movie not found",
    }); 
}
res.status(200).json({
    success:true,
    data:movie,
});

} catch (error) {
    res.status(500).json({
        success:false,
        message:'Error fetching movie',
        error:error.message,
    });
}
};

//DELETE MOVIE
export const deleteMovie = async (req,res) =>{
  try {
    const movie = await MovieModel.findByIdAndDelete({_id:req.params.id});
    if(!movie){
        return res.status(404).json({
            success:false,
            message:"Movie not found0",
        });
    }
    res.status(200).json({
        success:true,
        message:`${movie.title} deleted successfully`
    });
  } catch (error) {
    res.status(500).json({
        success:true,
        message:'Error fetching movie',
        error:error.message,
    });
    
  }  
};

//update movie

export const updateMovie = async (req,res) => {
    try {
        const movie = await MovieModel.findById(req.params.id);
        if (!movie) {
            return res.status(404).json({
                success: false,
                message:'Movie not found',
            });
        }

        // Define allowed fields for update
        const allowedUpdates = [
            'title','description','movieImage','duration',
            'releaseYear','rating','videoUrl','trailerUrl','cast',
            'director','language','isAvailable'
        ];
        const updates = Object.keys(req.body);
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));
    if (!isValidOperation) {
      return res.status(400).json({
        success: false,
        message: 'Invalid fields provided for update',
      });
    }

    // Perform the update
    const updatedMovie = await MovieModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: `${updatedMovie.title} updated successfully`,
      data: updatedMovie,
    }); 
    } catch (error) {
       // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: messages,
      });
    }
    // Handle duplicate title error (unique constraint)
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Movie title already exists',
      });
    }
    // Handle invalid ObjectId
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid movie ID',
      });
    }
    // General server error
    res.status(500).json({
      success: false,
      message: 'Error updating movie',
      error: error.message,
    });  
    }
}


