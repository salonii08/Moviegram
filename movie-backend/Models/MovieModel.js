import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true,"Movie title is required"],
        trim: true,
        maxlength:[100,'title cannot exceed 100 characters'],
        unique: true
    },
    description:{
        type: String,
        required: [true, 'Movie description is required'],
        trim:true,
        maxlength: [ 500, 'Description cannot exceed 500 characters']
    },
    movieImage:{
        type: String,
        required: [true, 'Movie image URL is Required'],
        trim: true
    },
    genre:{
        type: [String],
        required: [true,'At least one genre is required'],
        enum: [
            'Action','Comedy','Drama','Horror','Sci-fi',
            'Romance','Thriller','Documentary','Animation',
            'Adventure','Fantasy','Crime'
        ] //enum-multiple options (vaneko yo bahek aru choose garna payena)
    },
    duration:{
        type: Number,
        required: [true, 'Movie duration is required'],
        min: [1, 'Duration must be at least 1 minute']
    },
    releaseYear:{
        type: Number,
        required: [true,'Release year is required'],
        min: [1888,'Release year cannot be before 1888'],
        max:[new Date().getFullYear()+1,'Release year cannot be in the future']
    },
    rating:{
        type: String,
        required: [true, 'Rating is required'],
        enum: ['G','PG','PG-13','R','NC-17']
    },
    videourl:{
        type:String,
        required:[true,'Video Url is required'],
        trim:true
    },
    trailerUrl:{
        type:String,
        trim:true
    },
    cast:{
        type:String,
        trim:true
    },
    director:{
        type:String,
        required:[true,'Director name is required'],
        trim:true
    },
    language:{
        type:String,
        required:[true,'Language is required'],
        trim:true
    },
    isAvailable:{
        type: Boolean,
        default:true
    },
    createdAt:{
        type:Date,
        Default:Date.now
    },

},{
    timestamps:true
});

export default mongoose.model("Movie",movieSchema)