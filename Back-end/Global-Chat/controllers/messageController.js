const userModel = require("../db/userModel");
const messageModel = require('../db/messageModel');
module.exports.messageController = async (req, res)=>{
    try{
        let userId = req.params.id;
        let {message} = req.body;
        let  user = await userModel.findOne({_id:userId});
        let newMessage = await messageModel.create({
            user:userId,
            content:message,
        });
        user.messages.push(newMessage._id);
        await user.save();
        
        res.redirect('/chat');
    }catch(err){
        res.redirect('/');
        req.flash("Something went wrong!");
        console.log(err);
        throw err;
    }
}