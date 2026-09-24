import mongoose from "mongoose";

const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);

        console.log("MongoDB connected successfully");
    }
    catch(error){
        console.loh("MongoDb connection failed");
        console.log(error.message);

        process.exit(1);
    }
}

export default connectDB;