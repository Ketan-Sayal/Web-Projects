const mongoose = require('mongoose');

mongoose.connect(`${process.env.MONGODB_URL}/MyFirstChatApp`)
.then(()=>{
    console.log("Mongodb connected!");
})
.catch((err)=>{
    console.log("Error: ", err);
});

module.exports = mongoose.connection;