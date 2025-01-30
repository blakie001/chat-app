import { Server } from "socket.io";

const onlineUsers = new Map();

export const initializeSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"],
        }
    });

    io.on("connection", (socket) => {

        const userId = socket.handshake.query.userId;
  
        if (userId) {
            onlineUsers.set(userId, socket.id);
            io.emit("user-online", userId);
        }          
      
        socket.on("disconnect", () => {
            onlineUsers.delete(userId);
            io.emit("user-offline", userId);            
        });

        console.log("A user connected:", socket.id);

        socket.on("join", (userId) => {
            onlineUsers.set(userId, socket.id);
            console.log(`User ${userId} is online`);
        });

        socket.on("typing", ({ senderId, receiverId }) => {
            const receiverSocketId = onlineUsers.get(receiverId);
            if (receiverSocketId) {
                io.to(receiverSocketId).emit("typing", { senderId });
            }
        });        

        socket.on("send_message", ({ senderId, receiverId, message }) => {
            console.log("Message received:", message);
            const receiverSocketId = onlineUsers.get(receiverId);
            if (receiverSocketId) {
                io.to(receiverSocketId).emit("receive_message", { senderId, message });
            }
        });
        

        
        socket.on("disconnect", () => {
            onlineUsers.forEach((value, key) => {
                if (value === socket.id) {
                    onlineUsers.delete(key);
                    console.log(`User ${key} went offline`);
                }
            });
        });
    });

    return io;
};
