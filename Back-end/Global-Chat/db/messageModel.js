const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
    },
    content:String,
    date:{
        type:Date,
        default:Date.now,
    }
});

module.exports = mongoose.model('message', messageSchema);