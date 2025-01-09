const jwt = require('jsonwebtoken');

function getToken(userData){
    return jwt.sign(userData, process.env.JWT_SECRET_KEY);
}

module.exports = getToken;