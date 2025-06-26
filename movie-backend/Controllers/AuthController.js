import { response } from "express";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import UserModel from "../Models/UserModel.js";

export const register = async (req,res) =>{
    const {username, email, password,avatar} = req.body;
    try {
        //check if the user already exist (by username or email)
        const existingUser = await UserModel.findOne({$or:[{email},{username}]})
        if (existingUser) {
            return res.status(400).json({
                message:`${username.username} already exist`
            })
        }
        //hash password
        const hashedPassword = await bcrypt.hash(password,10);

        //create new user
        const newUser = await UserModel.create({
            email ,
            password: hashedPassword,
            username ,
            avatar
        })
         res.status(201).json({ message: "User registered successfully", data:newUser });

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    console.error(error);
    }
}
 //login
export const login = async (req, res) => {
  const { username, password,  } = req.body;

  try {
    // Check the user if it's already logged in
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    // Check if the user's password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password); //123456  //2345645$%^&*()@#
    if (!isPasswordValid) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    // Generate cookie token and send it to the user

    // res.setHeader("Set-Cookie", "test=" + "myValue");

    // Generate JWT token
    const age = 1000 * 60 * 60 * 24 * 7; // 1week 

    const token = jwt.sign(  // jsonwebtoken jwt sign // fry rice 
      { 
        id: user.id, 
        username: user.username,
        avatar:user.avatar,
        isAdmin: false
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );

    const {password:userPassword, ...userInfo} = user.toObject();

  
    res
      .cookie("token", token, {  // cookie-parser
        httpOnly: true,
        // secure: true
        maxAge: age
      })
      .status(200)
      .json(userInfo); //avtar userbame, email id
      

    
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
    console.error(error);
  }
};

export const logout = (req, res) => {
 res.clearCookie("token").status(200).json({ message: "User logged out" }); 
};