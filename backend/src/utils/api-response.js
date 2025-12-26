class ApiResponse{
    constructor(statusCode, message="Success", data){
        this.statusCode = statusCode
        this.message = message
        this.data = data
        this.success = statusCode<400

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export { ApiResponse }