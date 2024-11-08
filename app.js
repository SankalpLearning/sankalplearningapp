require('dotenv').config({path: `${process.cwd()}/.env`});
const express = require('express');
const authRouter = require('./route/authRoute');
const courseRouter = require('./route/courseRoute');
const catchAsync = require('./utils/catchAsync');
const appError = require('./utils/appError');
const globalErrorHandler = require('./controller/errorController');

const app = express();

app.use(express.json());
var cors = require('cors');
app.use(cors());

app.get('/hello', (req, res) => {
    res.send('Hello!');
});

//All routes
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/course',courseRouter)


app.use('*', catchAsync (async(req,res,next)=>{
    throw new appError(`Can't find ${req.orginalUrl} on this server`,404);
}));

app.use(globalErrorHandler);

const PORT = process.env.APP_PORT || 4000

app.listen(process.env.APP_PORT,()=>{
    console.log('Server up and running',PORT)
});