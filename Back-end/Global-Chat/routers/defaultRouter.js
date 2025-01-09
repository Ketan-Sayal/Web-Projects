const express = require('express');
const isLoggedIn = require('../middlewares/isLoggedIn');
const userModel = require('../db/userModel');
const messageModel = require('../db/messageModel');
const router = express.Router();
require('dotenv').config();
const PORT = process.env.PORT_NUMBER;

router.get('/', (req, res)=>{
    try{
    let error = req.flash('error');
    res.status(200).render('index.ejs', {err:error});
    }catch(err){
        req.flash('error', err);
        res.redirect("/");
    }
    req.flash('error', "");
});

router.get("/signup", (req, res)=>{
    try{

        let err = req.flash('signup-error');
        res.status(200).render("signup.ejs", {err});

    }catch(err){
        req.flash("error", err);
        res.redirect('/');
    }
    req.flash("signup-error", "");
});



router.get('/chat',isLoggedIn, async (req, res)=>{
    try{
        const userEmail = req.user.email;
        let user = await userModel.findOne({email:userEmail}).populate('messages');
        let messages = await messageModel.find().populate('user');
        res.status(200).render('chat.ejs', {user, messages, port: PORT});
    }catch(err){
        res.redirect('/');
        req.flash("error", "Something went wrong!");
        console.log(err);
        throw err;
    }
});

module.exports = router;