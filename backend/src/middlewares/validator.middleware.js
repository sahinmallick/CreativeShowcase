import { validationResult } from "express-validator";

const validator = (req,res,next) =>{
    const errors = validationResult(req)

    if(errors.isEmpty()){
        return next()
    }

    const extractedError = errors.array().map(err => ({[err.param]: err.msg}))

     return res.status(422).json({
        success: false,
        message: "Received data is not valid!",
        errors: extractedError
    });
}

export default validator;