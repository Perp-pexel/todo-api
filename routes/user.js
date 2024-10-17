import { Router } from "express";
import { getProfile, logInUser, logOutUser, registerUser, updateProfile } from "../controllers/user.js";
import { userAvatarUpload } from "../middlewares/upload.js";

const userRouter = Router();

userRouter.post('/users/register', registerUser);

userRouter.post('/users/login', logInUser);

userRouter.get('/users/me',  getProfile);

userRouter.post('/users/logout', logOutUser);

userRouter.patch('/users/me',userAvatarUpload.single('userAvatar'), updateProfile)

export default userRouter;