import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

export const DB = async ()=>{
    try {
        console.log("Connecting to mongodb...");
        const connectionString = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log("\nMongodb connected\nConnection host: ", connectionString.connection.host,"\n");
    } catch (error) {
        console.log("Mongodb error: ", error);
        process.exit(1);
        
    }
}