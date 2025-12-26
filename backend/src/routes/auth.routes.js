import express from 'express'
import { changeCurrentPassword, getCurrentUser, loginUser, logoutUser, register, resetPassword, verifyUser } from '../controllers/auth.controller';
import { isLoggedIn } from '../middlewares/auth.middleware';
import { changePasswordValidator, userLoginValidator, userRegistrationValidator } from '../validators';
import validator from '../middlewares/validator.middleware';

const authRouter = express.Router()

authRouter.post('/register', userRegistrationValidator(), validator, register)
authRouter.post('/verify-user/:token', verifyUser)
authRouter.post('/login', loginUser)
authRouter.post('/logout', isLoggedIn, userLoginValidator(), validator, logoutUser)
authRouter.post('/reset-password/:token', resetPassword)
authRouter.post('/change-password', isLoggedIn, changePasswordValidator(), validator, changeCurrentPassword)
authRouter.get('/me', isLoggedIn, getCurrentUser)



export default authRouter;