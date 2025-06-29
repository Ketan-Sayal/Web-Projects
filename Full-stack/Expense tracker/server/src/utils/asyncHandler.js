import { ApiResponse } from "./ApiResponse.js";

export const asyncHander = (fn)=>async(req, res, next)=>{
    try {
        return await fn(req, res, next)
    } catch (error) {
        // console.log("Function errror: ", error);
        res.status(500).json(
            new ApiResponse(500, null, error.message)
        );
    }
}