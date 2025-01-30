import Message from "../models/message.model.js";
import { initializeSocket } from "../config/socket.config.js";


export const sendMessage = async (req, res) => {
    try {
        const { receiverId, message } = req.body;
        const senderId = req.user.id;
        
        const newMessage = new Message({ senderId, receiverId, message });
        await newMessage.save();


        const io = initializeSocket();
        io.to(receiverId).emit("receive_message", { senderId, message });
        // console.log("message send")
        return res.status(200).json({ message: "Message sent", receiverId });
    } catch (error) {
        return res.status(500).json({ error: "Error Sending Message", details: error.message });
    }
};

export const getMessages = async (req, res) => {
    try {
        const senderId = req.user.id;
        const { receiverId } = req.body;
        if (!receiverId) {
            return res.status(400).json({ message: "Receiver ID is required" });
        }

        const messages = await Message.find({
            $or: [
                { senderId, receiverId },
                { senderId: receiverId, receiverId: senderId }
            ]
        }).sort({ createdAt: 1 });

        return res.status(200).json({ messages });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Error Fetching Messages", details: error.message });
    }
};
