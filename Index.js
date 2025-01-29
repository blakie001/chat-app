import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/dbConnection.js";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";


const server = express();
server.use(express.json())
server.use(cors());
dotenv.config();


connectDb();


server.use("/", authRoutes);


server.listen(3000, () =>{
    console.log("Server is Running");
})