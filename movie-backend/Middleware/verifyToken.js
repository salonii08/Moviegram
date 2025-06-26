import jwt from 'jsonwebtoken'

export const verifyToken = async (req,res,next) =>{
    const token = req.cookies.token;

    if (!token) return res.status(401).json({msg:"Not Authentication"});

    jwt.verify(token,process.env.JWT_SECRET_KEY,async (err,user)=>{
        if (err) return res.status(403).json({msg:"Token is not valid"});

        req.user = user;
        next()
    });
}

export const verifyTokenAndAuthorization = async (req,res,next) => {
    verifyToken(req,res, ()=>{
        if (req.user.id === req.params.id){
            next();
        }else{
            res.status(403).json("You are not allower to do that!")
        }
    })
}