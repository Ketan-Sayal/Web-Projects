const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    heading: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],
    Date: {
        type: Date,
        default: Date.now
    },

    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment'
    }] 

});

module.exports = mongoose.model('post',postSchema);