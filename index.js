import express from 'express'
import mongoose from 'mongoose';
import todoRouter from './routes/todo.js';
import userRouter from './routes/user.js';
import cors from 'cors'
import Joi from 'joi';
import multer from 'multer'


// Connect to database
await mongoose.connect(process.env.MONGO_URI);

// Create an express app
const app = express();

// Use middlewares
app.use(cors())
app.use(express.json());

// Use  routes
app.use(todoRouter);
app.use(userRouter);


// Listen for incoming reqeusts
    app.listen(3000, () => {
        console. log('App is listening on port 3000');

    });



