
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const url = process.env.MONGODB_URL_LOCAL

export const connectUsingMongoose = async()=>{
    try{
        await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
        })
        console.log("Mongodb connected using mongoose")
    }catch(err){
        console.log(`Error while connecting to db: ${err}`)
    } 
}
