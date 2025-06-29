import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ApiError } from "../utils/ApiError.js";

dotenv.config({path:'../env'});



export const isLoggedIn = (req, res, next)=>{
    const token = req.cookies.token || req.headers.token?.replace("Barrer ", "").trim();
    try {
        if(!token || token===undefined){
            throw new ApiError(401, "User must logged in");
        }
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
        if(!decoded || decoded===undefined){
            throw new ApiError(401, " access token is invalid");
        }

        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
    
}