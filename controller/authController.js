const user = require("../db/models/user");
const jwt = require('jsonwebtoken');
const userTrack = require('../db/models/usertrack');
const bcrypt = require('bcrypt');
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const course = require("../db/models/course");


const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY,{expiresIn: process.env.JWT_EXPIRES_IN});
}

/*------------- signup -------------- */
const signup = catchAsync (async (req,res, next) => {
    const body = req.body;

   const newUser = await user.create({
        username: body.username,
        phone : body.phone,
        courseID : body.courseID,
        password : body.password,
   });

   if(!newUser){
    return next(new AppError('Failed to create the user',400));
    }

   const result = newUser.toJSON()

   delete result.password;
   delete result.deletedAt;

   result.token = generateToken({
        id : result.id
   })

    return res.status(201).json({
    status: 'success',
    data : result,
   });
});

/*------------- login -------------- */
const login = catchAsync(async (req,res,next)=> {
    const {phone,password} = req.body;

    if (!phone || !password) {
        return next(new AppError('Please provide phone and password',400));
    }

    const result = await user.findOne({where: {phone} });
    if (!result || !(await bcrypt.compare(password,result.password))) {
        return next(new AppError('Incorrect phone and password',400));
    }

    const token = generateToken({
        id : result.id
    });

    const body = req.body;
    const existingUser = await userTrack.create({
        phone : body.phone,
        password : body.password,
   });

   const track = existingUser.toJSON()

   delete track.password

   const oldTokens = user.tokens || []

    if (oldTokens.length){
        oldTokens.filter(t=> {
            const timeDiff = (Date.now() - parseInt(t.signedAt)) /1000
            if(timeDiff < 86400) {
                return t
            }
        })
    }
    return res.json({
        status: "success",
        token
    });
});

//Middlware to verify JWT Token
function verifyToken(req,res,next) {
    const token = req.headers.authorization;
    if(!token) {
        return res.status(401).json({message: "Access Denied"})
    }
    try{
        const decoded = jwt.verify(token.split(" ")[1],process.env.JWT_SECRET_KEY,);
        console.log(decoded);
        req.user = decoded;
        next();
    }catch (error){
        console.error("Error verifying token :",error);
        res.status(401).json({message: "Invalid Token"});
    }
}

const userDetails = catchAsync(async (req,res) => {
   try {

    const userinfo = await user.findByPk(req.user.id,{include:course});
    
    // const userPhone = user.phone;
    // const data = await user.findOne({phone:userPhone}).then(data=>{
    //     return res.send({status:'ok',data:data})
    // });
    
    if(!userinfo) {
        return res.status(404).json({message: "User not found"});
    }
    res.json({userinfo});

   }catch(error){
    console.log("Error fetching user info : ",error);
    res.status(500).json({message:"Server Error"});
   }
});

/*------------- logout -------------- */
const logout = catchAsync (async (req,res) => {
   if (req.headers && req.headers.authorization) {
    const token =  req.headers.authorization.split('')[1];
    if(!token) {
        return res.status(401).json({status : "success",message : "Authorization Fail..!"});
    }
   }
    res.json({ succes : true , message: 'Sign out successfull'});
    
});


/*---------------Authentication ------------ */
const authentication = catchAsync(async (req,res,next) => {
    let idToken = '';
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    {
        idToken = req.headers.authorization.split(' ')[1];
    }
    if(!idToken){
        return next(new AppError('Please login to get access',401));
    }
    const tokenDetail = jwt.verify(idToken,process.env.JWT_SECRET_KEY);
    const newUser = user.findByPk(tokenDetail.id);
    if(!newUser) {
        return next(new AppError('User no longer exists',400));
    }
    req.user = newUser;
    return next();

});

module.exports = { signup , login , verifyToken, authentication ,userDetails, logout};