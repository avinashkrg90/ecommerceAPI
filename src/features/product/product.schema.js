import mongoose from "mongoose"

export const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    category:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    inStock:{
        type:Number,
        required:true
    }

})

name, description, imageUrl, category, price, sizes, id