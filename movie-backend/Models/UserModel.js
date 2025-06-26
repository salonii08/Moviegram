import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
{
    email: {
        type: String,
        required: true,
        unique:true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/,"Please provide a valid email address"],
    },
    username:{
        type:String,
        required: true,
        trim: true,
        minlength: [3,"Username must be at least 3 characters long"],
    },
    password:{
        type:String,
        required: true,
        minlength:[6,"Password must be at least 6 characters long"],
    },
    avatar:{
        type:String,
    },
},
{ timestamps:true}
);

export default mongoose.model("User",UserSchema);