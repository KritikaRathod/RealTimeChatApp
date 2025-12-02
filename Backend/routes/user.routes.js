import express from 'express';
import { getCurrentuser } from '../controlers/user.controllers.js';
import isAuth from '../middlewares/isAuth.js';


const  userRouter=express.Router();

userRouter.post('/current',isAuth,getCurrentuser)

export default userRouter;