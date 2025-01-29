import mongoose, { connect } from "mongoose";

export const connectDb = async () =>{
    try
    {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log("DB Connected");
    }
    catch(err)
    {
        console.log(err);
    }
}

