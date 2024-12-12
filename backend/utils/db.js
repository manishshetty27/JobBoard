import mongoose from "mongoose";

const ConnectDB = async ()=> {
    try{
    await mongoose.connect(process.env.MONGO_URI)
    console.log("MongoDB Database Connected Successfully");
    
    } catch(error){
        console.log(error);
    }
}

export default ConnectDB