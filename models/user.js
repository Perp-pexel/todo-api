import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: { type: String, require:true },
    email: { type: String, require:true }
});