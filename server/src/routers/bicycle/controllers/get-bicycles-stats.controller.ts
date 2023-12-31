import { Request, Response } from "express";
import { BicycleModel } from "../../../models/bicycle.model";

export async function getBicyclesStats(req: Request, res: Response) {
    try {
        const bicycles = await BicycleModel.find().lean(true);
        const totalBikes = bicycles.length;
        const availableBikes = bicycles.filter((el) => el.status === "available").length;
        const bookedBikes = bicycles.filter((el) => el.status === "busy").length;
        const averageBikeCost =
            bicycles.length !== 0 ? (bicycles.reduce((acc, el) => acc + el.price!, 0) / totalBikes).toFixed(2) : 0;
        res.status(200).json({ success: true, data: { totalBikes, availableBikes, bookedBikes, averageBikeCost } });
    } catch (err) {
        res.status(500).json({ success: false, message: "Can not find bicycles in the database", details: err });
    }
}
