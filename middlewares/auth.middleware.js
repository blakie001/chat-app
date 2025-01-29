import jwt from "jsonwebtoken";
import User from "../models/User.js";


const verifyToken = async(req, res, next) =>{
    if(!req.header.authorization)
    {
        return res.status(500).json("Unauthenticated")
    }
    let token = req.header.authorization.split(" ")[1];
    if(!token) throw new Error ("token not found");

    try
    {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const User = await User.findById(decoded?.id);
        if(!User)
        {
            return res.status(401).json("User Not Found");
        }
        res.UserId = UserId;
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
            return res.status(401).json("JWT is Malformed");
        }
        console.log(err);
        return res.status(500).json("Interval Server Error");
    }
}

module.exports = { verifyToken };