import mongoose from "mongoose";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHander } from "../utils/asyncHandler.js";
import crypto from "crypto";

export const register = asyncHander(async(req, res)=>{
    // check if any feild is not empty
    // Check if email already exsits
    // create a user account
    // create a accessToken
    // give res as user without password
    const {username, email, password} = req.body;
    if([username, email, password].some((val)=>val.trim()==="")){
        throw new ApiError(402, "All feilds are required");
    }
    const existingUser = await User.findOne({email:email});
    if(existingUser){
        throw new ApiError(403, "User already exists");
    }
    const user = await User.create({
        username:username,
        email:email,
        password:password
    });
    if(!user) throw new ApiError(403, "Something went wrong while creating the user"); 

    const sendUser = await User.findById(user._id).select("-password");

    const acessToken = sendUser.getAccessToken();
    
    const options = {
        httpOnly:false,
        secure:true,
        expires:new Date(Date.now()+(5*24*60*60*1000))
    }
    // console.log("user Token: ",acessToken);
    

    return res.status(200).cookie("token", acessToken, options).json(
        new ApiResponse(200, {user:sendUser, acessToken}, "User registered successfully")
    );
});

export const login = asyncHander(async(req, res)=>{
    // check if any feild is empty
    // find the user and check if user already exists.
    // check if password is correct
    // res  the user and acess token
    const {email, password} = req.body;
    if(!email || !password){
        throw new ApiError(402, "All feilds are required");
    }

    const existingUser = await User.findOne({email:email});
    
    if(!existingUser){
        throw new ApiError(403, "User doesn't exists");
    }
    const isPasswordCorrect = await existingUser.isPasswordCorrect(password);
    if(!isPasswordCorrect){
        throw new ApiError(401, "User password is incorrect");
    }
    const sendUser = await User.findById(existingUser._id).select("-password");

    const acessToken = sendUser.getAccessToken();
    
    const options = {
        httpOnly:false,
        secure:true,
        expires:new Date(Date.now()+(5*24*60*60*1000))
    }

    return res.status(200).cookie("token", acessToken, options).json(
        new ApiResponse(200, {user:sendUser, acessToken}, "User logined successfully")
    );
});

export const getUser = asyncHander(async(req, res)=>{
    const {_id:userId} = req.user;
    if(!userId){
        throw new ApiError(403, "Undefined user id");
    }
    
    const user = await User.findById(userId).select("-password");
    
    if(!user){
        throw new ApiError(403, "User doesn't exists");
    }

    return res.status(200).json(
        new ApiResponse(200, {user:user}, "User sent successfully")
    );
});

export const updateUserPassword = asyncHander(async(req, res)=>{
    // check if any parameter is empty
    // check prev password is coreect
    // change the passswod
    const {email, oldPassword, newPassword} = req.body;
    if(!email|| !oldPassword || !newPassword){
        throw new ApiError(402, "All feilds are required");
    }
    const user = await User.findOne({email});
    if(!user){
        throw new ApiError(403, "User doesn't exists");
    }
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
    if(!isPasswordCorrect){
        throw new ApiError(401, "User password is incorrect");
    }

    user.password = newPassword;
    user.save();
    return res.status(200).json(
        new ApiResponse(200, {user:user}, "User's password updated successfully")
    );
});

export const updateUser = asyncHander(async(req, res)=>{
    // check if any parameter is empty
    // check prev password is coreect
    // change the passswod
    const {_id} = req.user;
    const {email, newPassword, username} = req.body;
    if(!email || !newPassword || !username){
        throw new ApiError(402, "All feilds are required");
    }
    const user = await User.findById(_id);
    if(!user){
        throw new ApiError(403, "User doesn't exists");
    }

    const isPasswordCorrect = await user.isPasswordCorrect(newPassword);
    if(isPasswordCorrect){
        throw new ApiError(403, "Pervious password matches new Password");
    }

    user.password = newPassword;
    user.email = email;
    user.username= username;
    user.save();
    return res.status(200).json(
        new ApiResponse(200, {user:user}, "User's password updated successfully")
    );
});

export const googleLogin = asyncHander(async(req, res)=>{
    // check if email already exists if it does return that 
    // create a new user if doesn't and  return that
    const {email, username} = req.body;
    if(!email  || !username){
        throw new ApiError(401,"All feilds are required");
    }
    let existingUser = await User.findOne({email}).select("-password");
    const options = {
        httpOnly:false,
        secure:true,
        expires:new Date(Date.now()+(5*24*60*60*1000))
    }
    if(!existingUser){
        const randomPassword = crypto.randomBytes(32).toString("hex");
        const user = await User.create({
            username,
            email,
            password:randomPassword
        });
        existingUser = await User.findById(user._id).select("-password");
        const token = existingUser.getAccessToken();
        return res.status(200).cookie("token", token, options).json(
            new ApiResponse(200, {user:existingUser, acessToken:token}, "user retrived successfully")
        );
    }
    const token = existingUser.getAccessToken();
    return res.status(200).cookie("token", token, options).json(
            new ApiResponse(200, {user:existingUser, acessToken:token}, "user retrived successfully")
        );
});

export const logout = asyncHander((req, res)=>{

    const options = {
        httpOnly:false,
        secure:true,
    }

    return res.clearCookie("token", options).json(
        new ApiResponse(200, {sucess:true}, "User logout successfully")
    );
});