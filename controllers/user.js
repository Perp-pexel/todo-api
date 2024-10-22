import { logInUserValidator, registerUserValidator } from "../validator/user.js";
import { UserModel } from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { mailTransporter } from "../utils/mail.js";
 

export const registerUser= async (req, res, next) => {
    try {
        // Validate user input
        const {error, value} = registerUserValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }
        // Check if user does not exist
        const user = await UserModel.findOne({ email: value.email });
        if (user) {
            return res.status(409).json('user already exist!');
        }
        // Hash their password
        const hashedPassword = bcrypt.hashSync(value.password, 10);
        // Save user into dataabase
        await UserModel.create({
            ...value,
            password: hashedPassword
        });
        // Send user confirmational email
        await mailTransporter.sendMail({
            to: value.email,
            subject: 'User Registration',
            text: 'Account registered successfully'
        });
        // Respond to request 
        res.json('Registered user!');
    } catch (error) {
        next (error);
        
    }
}

export const logInUser = async (req, res, next) => {
   try {
    // Validate user input
    const { error, value } = logInUserValidator.validate(req.body)
    if (error) {
        return res.status(422).json(error);
    }
    // find one user with identifier
    const user = await UserModel.findOne({email: value.email });
    if (!user) {
        return res.status(404).json('User does not exist!')
    }
    // Compare their passwords
    const correctPassword = bcrypt.compareSync(value.password, user.password);
    if (!correctPassword) {
        return res.status(401).json('Invalid credentials!')
    }
    // Sign a token for user
    const token = jwt.sign(
        {id: user.id},
        process.env.JWT_PRIVATE_KEY,
        { expiresIn: '24h'}
    );

    // Respond to request
     res.json({
        message: 'User checked in!',
        accessToken: token
     });
   } catch (error) {
     next (error);
   }
}

export const getProfile = async(req, res, next) => {
    try {
        console.log(req.auth);
        // Find authentcated user from database
        const user = await UserModel
        // .findById(req.user.id) *when writtinng own code
        .findById(req.auth.id)
        .select({ password: false });
        // Respond to request
        res.json(user);
    } catch (error) {
      next (error);
    }
}
export const logOutUser = (req, res, next) => {
    res.json('User checked out!');
}

export const updateProfile = (req, res, next) => {
    try {
        // Validate user input
        const { error, value } = updateProfileValidator.validate(req.body);
        res.json('User profile updated');
    } catch (error) {
        next(error);
        
    }
}