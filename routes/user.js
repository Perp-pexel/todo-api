import { Router } from "express";
import { logInUser, logOutUser, registerUser } from "../controllers/user.js";

const userRouter = Router();

userRouter.post('/users/register', registerUser);

userRouter.post('/users/login', logInUser);

userRouter.post('/users/logout', logOutUser);

export default userRouter;