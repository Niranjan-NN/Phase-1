import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import fetchWeatherData from "./services/weatherService.js";
import weatherRoutes from "./routes/weatherRoutes.js";
import schedule from "node-schedule";
import chalk from "chalk";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// API Routes
app.use("/api/weather", weatherRoutes);

// Schedule job to fetch weather every hour
schedule.scheduleJob("0 * * * *", () => {
    console.log(chalk.blue("⏳ Fetching latest weather data..."));
    fetchWeatherData();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(chalk.green(`🚀 Server running on port ${PORT}`)));
