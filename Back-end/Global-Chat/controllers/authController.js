const getToken = require('../utils/getToken');
const userModel = require('../db/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { isEmailValid } = require('../utils/isEmailValid');

module.exports.loginController = async (req, res) => {
    try {
        let { email, password } = req.body;
        let user = await userModel.findOne({ email });
        if (user) {
            const hash = user.password;
            bcrypt.compare(password, hash, function (err, result) {
                if (result) {
                    let token = getToken({name:user.name, email:user.email, avatar:user.avatar});
                    res.cookie('token', token);
                    res.status(303).redirect('/chat');
                }
                else {
                    req.flash('error', 'Email or password is incorrect!');
                    res.status(303).redirect('/');
                }
                if (err) {
                    req.flash('error', 'Email or password is incorrect!');
                    res.status(303).redirect('/');
                }
            });
        }
        else {
            req.flash('error', 'Email or password is incorrect!');
            res.status(303).redirect('/');
        }
    } catch (err) {
        req.flash('error', 'Email or password is incorrect!');
        res.status(303).redirect('/');
        throw err;
    }
}

module.exports.sigupController = async (req, res) => {
    try {
        const { name, avatar, email, age, password } = req.body;
        let user = await userModel.findOne({email});
        if(user){
            req.flash('error', 'User Already Exists');
            return res.status(302).redirect('/'); 
        }
        let isEmail = await isEmailValid(String(email)); 
        if(isEmail && !user){
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                if (err) {
                    req.flash('signup-error', 'Something went wrong!');
                    res.status(302).redirect('/signup');
                    throw err;
                }
                else {
                    let user = await userModel.create({
                        name,
                        age,
                        email,
                        avatar,
                        password:hash,
                    });
                    let token = getToken({name, email, avatar});
                    res.cookie('token', token);
                    res.status(303).redirect('/chat');
                }
            });
        });
    }else{
        req.flash('signup-error', 'Give a valid Email address!');
        res.status(302).redirect('/signup');
    }

    } catch (err) {
        req.flash('signup-error', 'Something went wrong!');
        res.status(302).redirect('/signup');
        throw err;
    }
}