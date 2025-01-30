import { compare } from "bcrypt";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../config/jwt.token.js";

export const signupUser = async (req, res) =>{
    let existingUser = await User.findOne({ email: req.body.email });
    
    if(existingUser)
    {
        return res.status(409).json("Username or email Already Exists");
    }

    const salt = bcrypt.genSaltSync(10);
    const securedPassword = bcrypt.hashSync(req.body.password, salt);
    try
    {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: securedPassword
        })    

        const savedUser = await newUser.save();
        return res.status(200).json("User Created Successfully");
    }
    catch (error)
    {
        return res.status(500).json(error);
    } 
};


export const loginUser = async (req, res) =>{
    let user = await User.findOne({ email: req.body.email });
    if(!user)
    {
        return res.status(404).json("Email Not Found");
    }
    
    try
    {
        if(!user.password)
        {
            return res.status(404).json("Enter Password");
        }
        const securedPassword = await bcrypt.compare(
            req.body.password,
            user.password
        )
        if(!securedPassword)
        {
            return res.status(401).json("Wrong Passwrod")
        }
        const token = await generateToken(user?._id.toString());
        return res.status(200).json({
            token: token,
          });
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json(err)
    }
}