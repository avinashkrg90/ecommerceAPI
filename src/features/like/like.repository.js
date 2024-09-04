import mongoose from "mongoose";
import { likeSchema } from "./like.schema.js";
const LikeModel = mongoose.model('Like', likeSchema);

export default class LikeRepository{
    async likeProduct(userId, productId){
        try{
            const newLike = new LikeModel({
                user: userId,
                likeable: productId,
                types:'Product'
            })
            await newLike.save();
        }catch(err){
            console.log(err)
        }
    }

    async likeCategory(userId, categoryId){
        try{
            const newLike = new LikeModel({
                user: userId,
                likeable: categoryId,
                types:'Category'
            })
            await newLike.save();
        }catch(err){
            console.log(err)
        }
    }
}