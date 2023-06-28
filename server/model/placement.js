import mongoose from "mongoose";
import {placementType} from "./enum/placementType.js";

const placementSchema = new mongoose.Schema(
    {
        placementName: {
            type: String,
            required: true
        },
        priceForKgFish: {
            type: Number,
        },
        ownerPhone: {
            type: String
        },
        distance: {
          type: Number,
        },
        link: {
            type: String
        },
        photos: [{
            url: {
                type: String,
            },
            contentType: {
                type: String,
            },
            path: {
                type: String,
            },
        }],
        tips: {
            type: String
        },
        placementT: {
            type: String,
            enum: Object.values(placementType),
            required: true
        },
        date: {
            type: Date,
            default: Date.now()
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users'
        },
    },
    {timestamps: true}
);

export default mongoose.model("Placements", placementSchema);