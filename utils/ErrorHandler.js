class ErrorHandler extends Error{
    constructor(message,statucode){
        super(message);
        console.log(statucode);
        this.statucode = statucode;
        Error.captureStackTrace(this,this.constructor);
    }
}   

module.exports = ErrorHandler;