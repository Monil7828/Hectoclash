import { Match } from "../models/matchModel.js";
import { User } from "../models/userModel.js";
import { generateProblem } from "../utils/generateProblem.js";

export const createOrJoinMatch = async (req, res) => {
    try {
        const userId = req.user.id; // Changed from destructuring req.id
        let match = await Match.findOne({ status: 'pending' });

        if (!match) {
            match = new Match({
                player1: userId,
                status: 'pending',
                problem: "123456",
            });
            await match.save();
            return res.status(201).json({ message: 'Match created', match });
        } else {
            match.player2 = userId;
            match.status = 'started';
            match.startTime = new Date();
            await match.save();
            return res.status(200).json({ message: 'Match found', match });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
export const submitAnswer = async (req, res) => {
    try {
        const userId = req.user.id; // Extract user ID from JWT
        const { matchId, answer } = req.body;

        // Validate input
        if (!matchId || !answer) {
            return res.status(400).json({ message: "Match ID and answer are required" });
        }

        const match = await Match.findById(matchId);
        if (!match || match.status !== "started") {
            return res.status(404).json({ message: "Match not found or already finished" });
        }

        let isValid = false;
        try {
            // Convert × → * and ÷ → /
            const evalAnswer = answer.replace(/×|x/g, "*").replace(/÷/g, "/");
            console.log("Evaluated Answer:", evalAnswer);

            if (eval(evalAnswer) === 100) {
                isValid = true;
            }
        } catch (error) {
            console.error("Invalid expression:", error);
            return res.status(400).json({ message: "Invalid expression format" });
        }

        if (isValid) {
            if (!match.winner) {
                // ✅ First player to submit correct answer wins
                match.winner = userId;
                match.status = "finished";
                match.endTime = new Date();
                await match.save(); // ✅ Ensure match is updated in DB first

                // ✅ Fetch winner's current stats
                const winner = await User.findById(userId);

                // ✅ Calculate highest score
                const newScore = winner.score + 100;
                // const newHighestScore = Math.max(winner.stats.higestScore, newScore);

                // ✅ Increase winner's rating & stats
                const updatedWinner = await User.findByIdAndUpdate(userId, {
                    $inc: { "stats.gamesPlayed": 1, "stats.wins": 1},
                }, { new: true });

                // ✅ Update loser's match count if they exist
                const loserId = userId === match.player1 ? match.player2 : match.player1;
                if (loserId) {
                    await User.findByIdAndUpdate(loserId, { $inc: { "stats.gamesPlayed": 1, "stats.losses": 1 } });
                }

                return res.status(200).json({ 
                    message: "Correct answer! You won the match!", 
                    match,
                    updatedWinner
                });
            } else {
                return res.status(400).json({ message: "Match already won by another player!" });
            }
        }

        return res.status(400).json({ message: "Incorrect answer, try again!" });
    } catch (error) {
        console.error("Error in submitAnswer:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

