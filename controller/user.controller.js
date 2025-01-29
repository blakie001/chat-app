import User from "../models/User.js";

exports.getUserProfile = async (req, res) =>{
    let userId = res.userId;

    try {
        const user = await User.findOne({_id: userId});   
        return res.status(200).json(user);
    } catch (error) {
        console.log(error)
        return res.status(500).json("Internal server error")
    }

}