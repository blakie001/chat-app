import jwt, { decode } from "jsonwebtoken";
import User from "../models/user.model.js";


export const verifyToken = async(req, res, next) =>{
    try {
        if(!req.headers.authorization)
        {
            return res.status(500).json("Unauthenticated")
        }
        let token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json("Token not found");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if(!user)
        {
            return res.status(401).json("User Not Found");
        }
        // req.userId = user._id;
        req.user = { id: user._id };
        next();
    }
    catch(err)
    {
        if(err.name === "TokenExpiredErr")
        {
            return res.status(401).json("JWT token Expired");
        }
        else if(err.name === "JsonWebTokenError")
        {
            // console.log(err)
            return res.status(401).json("JWT is Malformed");
        }
        console.log(err);
        return res.status(500).json("Interval Server Error");
    }
}
