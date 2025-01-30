import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/dbConnection.js";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import userRoutes from "./routes/user.routes.js";
import { createServer } from "http";
import { initializeSocket } from "./config/socket.config.js";

dotenv.config();

const server = express();
server.use(express.json());
server.use(cors());

const client = createServer(server);

const io = initializeSocket(client);

connectDb();
server.use("/", authRoutes);
server.use("/", chatRoutes);
server.use("/", userRoutes);


client.listen(3000, () => {
    console.log("Server is Running on port 3000");
});
