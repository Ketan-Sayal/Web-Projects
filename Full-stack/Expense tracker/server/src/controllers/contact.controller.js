import { Contact } from "../models/contact.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHander } from "../utils/asyncHandler.js";

export const create = asyncHander(async(req, res)=>{
    // check if any feild is empty?
    // crate a contact feild in data base
    // send the newily created query by the user as a response
    const {name, email, message} = req.body;
    if(!name || !email || !message){
        throw new ApiError(403, "All feilds are required");
    }
    const queryInfo = await Contact.create({
        name,
        email,
        message
    });
    if(!queryInfo){
        throw new ApiError(500, "Server Error");
    }
    return res.status(200).json(
        new ApiResponse(200, {query:queryInfo}, "Query created successfully")
    );
});