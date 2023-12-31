import { model, Schema } from "mongoose";

const BicycleSchema = new Schema({
    id: {
        type: String,
        unique: true,
    },
    name: String,
    type: String,
    color: String,
    description: String,
    wheelSize: Number,
    price: Number,
    status: {
        type: String,
        enum: ["available", "busy", "unavailable"],
        default: "available",
    },
});
export const BicycleModel = model("Bicycle", BicycleSchema);
