import Weather from "../models/Weather.js";

export const getWeatherHistory = async (req, res) => {
    try {
        const { start, end } = req.query;
        const filter = {};

        if (start && end) {
            filter.timestamp = { $gte: new Date(start), $lte: new Date(end) };
        }

        const history = await Weather.find(filter).sort({ timestamp: -1 });
        res.json(history);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "❌ Server Error" });
    }
};
