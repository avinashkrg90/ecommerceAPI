
import mongoose from "mongoose";
import { userSchema } from "./user.Schema.js";

const UserModel = mongoose.model('User', userSchema) //User is the collection name

export default class UserRepository{
    async signUp(user){
        try{
            const newUser = new UserModel(user);
            await newUser.save();
        }catch(err){
            console.log(err);
        }
    }

    async logIn(email, password){
        try{
            return await UserModel.findOne({email, password})
        }catch(err){
            console.log(err);
        }
    }

    async resetPassword(userId, hashedPassword){
        try{
            let user = await UserModel.findById(userId)
            if (user){
                user.password = hashedPassword;
                user.save();
            }else{
                console.log("no such user")
            }
            
        }catch(err){
            console.log(err)
        }
    }

    async findByEmail(email){
        try{
            return await UserModel.findOne({email});
        }catch(err){
            console.log(err);
        }
    }
}