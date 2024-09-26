require('dotenv').config({path:'./.env'})
const express = require('express');
const cors = require('cors');
const app = express();
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');

// Cors config
app.use(cors({
    origin: true,  // Dynamically allow all origins
    credentials: true  // Allow credentials (cookies, auth headers, etc.)
}));

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

// file uploads
const fileUploads = require('express-fileupload');
app.use(fileUploads());

// routes
app.use('/',require('./routes/indexRouter.js'));

app.use('/resume',require('./routes/resumeRouter.js'));

app.use('/employe',require('./routes/employeRouter.js'));

// errors
const ErrorHandler = require('./utils/ErrorHandler.js');
const { Generatederror } = require('./middlewares/GeneratedErrors.js');

app.all('*',(req,res,next)=>{
    next(new ErrorHandler(`Requested ${req.url} Not Found`,404))
})
app.use(Generatederror);


app.listen(process.env.PORT)