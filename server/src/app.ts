import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import bicycleRouter from "./routers/bicycle/bicycle.router";
import validationFilter from "./lib/validation-error.filter";

dotenv.config({ path: process.env.ENV_FILE_PATH || ".env" });
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

async function main() {
    const app = express();
    await mongoose.connect(MONGODB_URI!);
    app.use(bodyParser.json());
    app.use(cors());
    app.use("/bicycle", bicycleRouter);
    app.use(validationFilter);
    app.listen(PORT, () => {
        console.log(`Server listening at ${PORT}`);
    });
}

main();
