// import jwt from "jsonwebtoken";
import { expressjwt } from "express-jwt";
import { UserModel } from "../models/user.js";

export const isAuthenticated = expressjwt({
    secret: process.env.JWT_PRIVATE_KEY,
    algorithms: ['HS256']
});


export const hasPermission = (action) => {
    return async (req, res, next) => {
try {
    // find user from database
    const user = await UserModel.findById(req.auth.id);
    // Use the user role to find permission
    const permission = permissions.find(value => value.role === user.role);
    if(!permission){
        return res.status(403).json('No permission found!')
    }
    // Chech if permission action includes action
    if (permission.actions.includes(action)) {
        next();
    } else{
        res.status(403).json('Action not allowed!')
    }
            
} catch (error) {
    next( error)
    
}

    }
}





// writing isAuthenticated yourself
// export const isAuthenticated =(req, res, next) => {
// try {
//         // Get authorization header
//         const authorization = req.headers.authorization;
//         console.log(authorization);
//         // Extract token from the authorization header
//         const token = authorization.split(' ')[1];
//         // Verify and decode token to get user
//         const decoded = jwt.verify(
//             token,
//             process.env.JWT_PRIVATE_KEY
//         );
//         console.log(decoded);
//         // Attach user to requst
//         req.user = { id: decoded.id }
//         // Hand over requst to the next middleware/controller
//         next();
// } catch (error) {
//     next (error);
    
// }
// }