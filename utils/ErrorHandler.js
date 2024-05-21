class ErrorHandler extends Error{
    constructor(message,statucode){
        super(message);
        this.statucode = statucode;
        Error.captureStackTrace(this,this.constructor);
    }
}

module.exports = ErrorHandler;