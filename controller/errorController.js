const AppError = require("../utils/appError");

const sendErrorDev = (error,res) => {
    const statuscode = error.statuscode || 500;
    const status = error.status || 'error';
    const message = error.message;
    const stack = error.stack;

    res.status(statuscode).json({
        status,
        message,
        stack,
    });
}

const sendErrorProduction = (error,res) => {
    const statuscode = error.statuscode || 500;
    const status = error.status || 'error';
    const message = error.message;
    const stack = error.stack;

    if(error.isOperational) {
        return res.status(statuscode).json({
            status,
            message,
        });
    }
    
    console.log(error.name,error.message,stack);

    return res.status(500).json({
        status : "error",
        message : "Something went wrong",
    });
}

const globalErrorHandler = (err,req,res,next) => {
    if (err.name === 'JsonWebTokenError'){
        err = new AppError('Invalid token ',401);
    }
   if (err.name === 'SequelizeValidationError'){
        err = new AppError(err.errors[0],message,400);
   }
   if (err.name === 'SequelizeUniqueConstraintError'){
        err = new AppError(err.errors[0].message,400);
   }
   if (process.env.NODE_ENV === 'development'){
        return sendErrorDev(err,res);
    }
    sendErrorProduction(err,res);
};
module.exports = globalErrorHandler;