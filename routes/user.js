import { Router } from "express";
import { logInUser, logOutUser, registerUser, updateProfile } from "../controllers/user.js";
import { userAvatarUpload } from "../middlewares/upload.js";

const userRouter = Router();

userRouter.post('/users/register', registerUser);

userRouter.post('/users/login', logInUser);

userRouter.post('/users/logout', logOutUser);

userRouter.post('/users/me',userAvatarUpload.single('userAvatar'), updateProfile)

export default userRouter;