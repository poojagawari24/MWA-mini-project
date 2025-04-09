
import dotenv from 'dotenv'
dotenv.config();
import mongoose from 'mongoose'
export const connectDB = async()=>{
    try{
       
        const conn = await mongoose.connect(`${process.env.MONGO_URL}`)
        console.log(`Connected to: ${conn.connection.host}`)
       // console.log(`Here inside connectDB method!`)
        return conn;
    }
    catch(err){
        console.log(`Error connecting with DB : ${err.message}`);
        throw err; 
    }
}