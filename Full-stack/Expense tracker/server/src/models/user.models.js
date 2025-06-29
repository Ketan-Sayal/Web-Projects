import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({path:'../env'});

const userSchema = new mongoose.Schema({
    username: {
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        unique:true,
        index:true,
        required:true
    },
    password:{
        type:String,
        required:true
    }

}, {timestamps:true});


userSchema.pre("save", async function(next){
    if(!this.isModified("password")) next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.getAccessToken = function(){
    return jwt.sign({
        _id:this._id,
    }, process.env.ACCESS_TOKEN, {expiresIn:process.env.ACCESS_TOKEN_EXPIRY});
}

userSchema.methods.isPasswordCorrect = async function(password){
    const result = await bcrypt.compare(password, this.password);
    return result;
}

export const User = mongoose.model("User", userSchema);