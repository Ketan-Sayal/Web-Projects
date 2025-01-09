const express =require('express');
const  app = express();

// Extra Packages
const jwt =  require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const path = require('path');
const flash = require("connect-flash");
const server = require("./config/socket-io-config");
const session = require("express-session");

//Enviroment variable and mongodb configration usage
require('dotenv').config();
const db = require('./config/mongodb-config');
const PORT = process.env.PORT_NUMBER;

// Routers
const defaultRouter = require('./routers/defaultRouter');
const sendMessageRouter = require('./routers/sendMessageRouter');


// Middlwares
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret:process.env.EXPRESS_SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
}));
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

// Ejs setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//Path middlewares
app.use('/', defaultRouter);
app.use('/send', sendMessageRouter);


server(app).listen(PORT, ()=>{
    console.log('Server is running at', PORT);
})