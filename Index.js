const express = require("express");
const dotenv = require("dotenv");
const { connectDb } = require("./config/dbConnection");
const cors = require("cors");


// Routes
const authRoutes = require("./routes/auth.routes");



const server = express();
server.use(express.json())
server.use(cors());
dotenv.config();

// DB Connection :
connectDb();


server.use(authRoutes.router)


server.listen(3000, () =>{
    console.log("Server is Running");
})