import { logInUserValidator, registerUserValidator } from "../validator/user.js";
import { UserModel } from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
 

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
        // Respond to request 
        res.json('Register user!');
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
        {id:user.id},
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

export const getProfile =  (req, res, next) => {
    res.json('User profile')
}
export const logOutUser = (req, res, next) => {
    res.json('User checked out!');
}

export const updateProfile = (req, res, next) => {
    res.json('User profile updated');
}