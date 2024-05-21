require('dotenv').config({path:'./.env'})
const express = require('express');
const app = express();

// logger
const logger = require('morgan');
app.use(logger("tiny"));

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