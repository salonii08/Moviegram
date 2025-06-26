import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import userRoutes from "./Routes/UserRoutes.js"
import PostRoute from "./Routes/PostRoute.js"
import authRoutes from "./Routes/AuthRoutes.js"
import favoriteRoutes from "./Routes/FavoriteRoutes.js"
import cors from 'cors'
dotenv.config()


const app = express()

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Adjust to your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Allow cookies to be sent
}));
app.use(cookieParser()); // Parse cookies
app.use(express.json()); // Parse JSON bodies

app.use("/api/auth",authRoutes);
app.use("/api/movie",PostRoute);
app.use("/api/user",userRoutes);
app.use("/api/favorites",favoriteRoutes);




mongoose.connect(process.env.MONGO_URL).then(()=>{
    app.listen( process.env.PORT, 
    console.log("Connected to DB & Server running on",process.env.PORT))
}).catch(err => 
    console.error(err)
) 


