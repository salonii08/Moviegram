
import UserModel from "../Models/UserModel.js"
import bcrypt from "bcrypt"

// create new user

// export const newUser = async (req,res) =>
// {
//     try {
//         const user = await UserModel.create(req.body);
//         res.status(201).json({
//             success:true,
//             Message:`${user.username} is created`,
//             data: user,
//         });
        
//     } catch (error) {
//         res.status(400).json({
//             success:false,
//             message:"error creating user",
//             error:error.message,
//         });
//     }
// };

// get all user 
export const getUsers = async (req,res) =>{
    try {
        const user = await UserModel.find()
        res.status(200).json({
            success:true,
            data:user,
        });
    } catch (error) {
      res.status(400).json({
        success:false,
        message:"user not found",
        error:error.message
      });  
    };
}
    //get user by id

    export const getUser = async (req,res) =>{
     try {
        const user = await UserModel.findById({_id:req.params.id});
        if(!user){
        return res.status(404).json({
            success:true,
            message:"User not found",
        }); 
    }
    res.status(200).json({
        success:true,
        data:user,
    });
    
    } catch (error) {
        res.status(500).json({
            success:false,
            message:'Error fetching user',
            error:error.message,
        });
    }
    };

    //DELETE user
    export const deleteuser = async (req,res) =>{
      try {
        const user = await UserModel.findByIdAndDelete({_id:req.params.id});
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found",
            });
        }
        res.status(200).json({
            success:true,
            message:`${user.username} deleted successfully`
        });
      } catch (error) {
        res.status(500).json({
            success:true,
            message:'Error fetching movie',
            error:error.message,
        });
        
      }  
    };

    //update user
    
    export const updateuser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Define allowed fields
    const allowedUpdates = ['email', 'username', 'password', 'avatar'];
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every(update =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      return res.status(400).json({
        success: false,
        message: 'Invalid fields provided for update',
      });
    }

    // Hash password if it's being updated
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    ).select('-password'); // Optional: don't return password

    res.status(200).json({
      success: true,
      message: `User updated successfully`,
      data: updatedUser,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: messages,
      });
    }
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Email or username already exists',
      });
    }
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error updating user',
      error: error.message,
    });
  }
};

    
    
    