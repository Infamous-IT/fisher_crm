import mongoose from "mongoose";
import {roles} from "./enum/roles.js";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        surname: {
            type: String,
            required: true
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
    },
    {timestamps: true}
);

export default mongoose.model("Users", userSchema);