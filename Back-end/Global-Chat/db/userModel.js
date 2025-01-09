const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:String,
    age:Number,
    email:String,
    avatar:String,
    password:String,
    messages:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"message",
        default:[],
    }]
});

module.exports = mongoose.model('user', userSchema);