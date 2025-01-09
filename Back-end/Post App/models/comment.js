let mongoose = require('mongoose');

commentSchema = mongoose.Schema({
    user: {
        type: String
    },
    content: String,
    Date: {
        type: Date,
        default: new Date
    }
});

module.exports = mongoose.model('comment', commentSchema);