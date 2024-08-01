const jwt = require('jsonwebtoken');
const ErrorHandler = require('../utils/ErrorHandler');

exports.isAuthenticated = (req,res,next)=>{
    const {token} = req.cookies;
    if(!token) {
        return next(new ErrorHandler("You are not logged in",401))
    }
    const {id} = jwt.verify(token, process.env.JWT_SECRET);
    req.id = id
    next();
}