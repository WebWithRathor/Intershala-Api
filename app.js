require('dotenv').config({path:'./.env'})
const express = require('express');
const app = express();

const logger = require('morgan')
app.use(logger("tiny"));

app.use('/',require('./routes/indexRouter.js'));


app.listen(process.env.PORT)