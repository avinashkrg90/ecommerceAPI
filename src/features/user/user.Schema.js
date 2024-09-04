import mongoose from "mongoose"

export const userSchema = new mongoose.Schema({
    name:{
        type: String,
        maxLength:[25, "Name can't be greater than 25 characters"],
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        match:[/.+\@.+\../, "Please enter a valid email"]
    },
    password:{
        type: String,
        required: true,
        validate:{
            validator: function(value){
                return /^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/.test(value)
            },
            message:"Password should ne between 8-12 characters and have a special character"
        }
    },
    type:{
        type: String,
        enum: ['customer', "seller"]
    }
})
