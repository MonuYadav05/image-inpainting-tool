import mongoose from "mongoose";

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URL || "");
        console.log("connected to mongodb")
    }catch(e){
        console.error("MongoDB connection error:", e);
        process.exit(1);
    
    }
}

export default connectDB