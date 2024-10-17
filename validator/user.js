import Joi from "joi";

export const registerUserValidator = Joi.object( {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

export const logInUserValidator = Joi.object( {
    name: Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
});