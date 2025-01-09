const jwt = require('jsonwebtoken');

async function isLoggedIn(req, res, next){
    try{
        let token = req.cookies.token;
        if(token){
            let data = await jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.user = data;
            next();
        }else{
            req.flash('error', "You Must Logged in!");
            res.redirect("/"); 
        }
    }catch(err){
        req.flash('error', "Something went wrong!");
        res.redirect("/");
    }
    // finally{
    //     next();
    // } it is wrong because server send headers by default which can cause your app to crash.
}

module.exports = isLoggedIn;