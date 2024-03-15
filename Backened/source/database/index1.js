import mongoose from  "mongoose";
import { DB_NAME } from "../constants.js";
const connectdb =async ()=>{
    try{
       const connection_instance=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
       console.log(`\n Mongo_DB connected DB:Host ${connection_instance.connection.host}`);
    }catch(error){
        console.log("Mongoose cooection error",error);
        process.exit(1);
    }
}
export default connectdb