import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import bicycleRouter from "./routers/bicycle/bicycle.router";
import validationFilter from "./lib/validation-error.filter";
import mongoose from "mongoose";

dotenv.config();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || "";

async function main() {
    const app = express();
    await mongoose.connect(MONGODB_URI);
    app.use(bodyParser.json());
    app.use("/bicycle", bicycleRouter);
    app.use(validationFilter);
    app.listen(PORT, () => {
        console.log(`Server listening at ${PORT}`);
    });
}

main();
