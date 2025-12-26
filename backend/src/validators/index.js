import { body } from 'express-validator'

export const userRegistrationValidator = () =>{
    return [
        body('email')
            .trim()
            .notEmpty().withMessage("Email is required!")
            .isEmail().withMessage("Email is invalid!"),
        body("username")
            .trim()
            .notEmpty().withMessage("username is required!")
            .isLength({min:3}).withMessage("Username must be atleast 3 characters!")
            .isLength({max: 13}).withMessage("Username cannot exceed more than 13 characters!"),
        body("password")
            .trim()
            .notEmpty().withMessage("Password is required!")
            .isLength({min:4}).withMessage("Password must be long than 4 characters!")
    ]
}


export const userLoginValidator = () =>{
    return [
        body('email')
            .trim()
            .notEmpty().withMessage("Email is required!"),
        body("password")
            .trim()
            .notEmpty().withMessage("Password is required!")
            .isLength({min:4}).withMessage("Password must be long than 4 characters!")
    ]
}

export const changePasswordValidator = () =>{
    return [
        body("password")
            .trim()
            .notEmpty().withMessage("Password is required!")
            .isLength({min:4}).withMessage("Password must be long than 4 characters!")
    ]
}
