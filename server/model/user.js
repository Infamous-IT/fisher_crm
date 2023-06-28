import mongoose from "mongoose";
import {roles} from "./enum/roles.js";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            minLength: 8,
            required: true
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        role: {
            type: String,
            enum: Object.values(roles),
            required: true
        },
        date: {
            type: Date,
            default: Date.now()
        },
        placements: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Placements'
        }],
        authToken: {
            type: String
        }
    },
    {timestamps: true}
);

export default mongoose.model("Users", userSchema);