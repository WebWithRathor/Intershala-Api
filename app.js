require('dotenv').config({path:'./.env'})
const express = require('express');
const app = express();
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');

// database configuration
require('./models/DataBase.js').ConnectDatabase();

// logger
const logger = require('morgan');
app.use(logger("tiny"));

// Body parser
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// session
app.use(expressSession({
    resave:false,
    saveUninitialized:false,
    secret:process.env.SESSION_SECRET,
}))
app.use(cookieParser());

// routes
app.use('/',require('./routes/indexRouter.js'));

// errors
const ErrorHandler = require('./utils/ErrorHandler.js');
const { Generatederror } = require('./middlewares/GeneratedErrors.js');
app.all('*',(req,res,next)=>{
    next(new ErrorHandler(`Requested ${req.url} Not Found`,404))
})
app.use(Generatederror);


app.listen(process.env.PORT)