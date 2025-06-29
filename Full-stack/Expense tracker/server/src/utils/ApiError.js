class ApiError extends Error{
    constructor(statusCode=500, message="Something went wrong", stack) {
        super(message);
        this.statusCode = statusCode;
        this.sucess = false;
        this.data = null;
        this.message = message;
        if(stack){
            this.stack = stack;
        }else{
            this.stack = Error.captureStackTrace(this, this.constructor);
        }
    }
}

export {
    ApiError
}