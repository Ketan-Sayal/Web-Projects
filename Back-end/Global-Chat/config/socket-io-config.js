const { Server } = require('socket.io');
const http = require('http');
require('dotenv').config();
const PORT = process.env.PORT_NUMBER;

const socketIoServer = (app)=>{
    const server = http.createServer(app);
    let users = [];

    const io = new Server(server, {
        cors: {
            origin: [
                `http://localhost:${PORT}`
        ],
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {
        socket.on('user-joined', ({name, avatar})=>{
            let newUser = {name,id:socket.id, avatar};
            users.push(newUser);
            socket.broadcast.emit('new-user', {name, avatar});
            
            let activeUsers = users.filter(user=>user.id!==socket.id);
            socket.emit("active-users", activeUsers);
        });
        socket.on("send-message", (message)=>{
            let currUser = users.find(user=>user.id === socket.id);
            socket.broadcast.emit("recive-message", {message, name: currUser.name, avatar:currUser.avatar});
        });
        socket.on("disconnect", ()=>{
            users = users.filter(user=>user.id  !== socket.id);
            users.forEach(remainingUser => {
                socket.broadcast.to(remainingUser.id).emit("left", 
                    users.filter(user => user.id !== remainingUser.id)
                );
            });
        });
    });
    return server;
}

module.exports = socketIoServer;