import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String,
        default: "",
    },
    rating: {
        type: Number,
        default: 0,
    },
    stats: {
        gamesPlayed: {
            type: Number,
            default: 0,
        },
        wins: {
            type: Number,
            default: 0,
        },
        losses: {
            type: Number,
            default: 0,
        },
     
    },
    // friends: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "User",
    //     },
    // ],

    matchHistory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Match",
        },
    ]
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);