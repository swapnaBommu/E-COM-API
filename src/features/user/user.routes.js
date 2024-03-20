//manage the routes of the user

//1. import express
import express from 'express';
import UserController from './user.controller.js';

//2.initialize express router
const userRouter  = express.Router();
const userController = new UserController;

//All the paths to controller methods

userRouter.post("/signup", userController.signUp);
userRouter.post('/signin', userController.signIn);



export default userRouter;