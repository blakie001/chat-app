import User from "../models/user.model.js";
import Message from "../models/message.model.js";

export const getUserWhoSentMessage = async(req, res) =>{

    try {
        const receiverId = req.user.id;
    
        const senderIds = await Message.distinct("senderId", { receiverId });
        const senders = await User.find({ _id: { $in: senderIds } }, 'username id');
    
        return res.status(200).json({ senders });
    } catch (error) {
        console.log(error);
        return res.status(500).json("Error Fetching Users");
    }

}

export const getUserProfile = async (req, res) =>{
    let userId = res.userId;

    try {
        const user = await User.findOne({_id: userId});
        return res.status(200).json(user);
    } catch (error) {
        console.log(error)
        return res.status(500).json("Internal server error")
    }
}