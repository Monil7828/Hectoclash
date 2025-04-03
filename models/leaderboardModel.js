import mongoose from "mongoose";

const leaderboardSchema = new mongoose.Schema({
    userName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    score: {
        type: Number,
        default: 0,
        required: true
    }
}, { timestamps: true });

export const Leaderboard = mongoose.model("Leaderboard", leaderboardSchema);
export default Leaderboard;
