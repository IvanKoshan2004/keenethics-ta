import { Request, Response } from "express";
import { BicycleModel } from "../../../models/bicycle.model";

export async function getAllBicycles(req: Request, res: Response) {
    try {
        const bicycles = await BicycleModel.find().lean(true);
        res.status(200).json({ success: true, data: { bicycles } });
    } catch (err) {
        res.status(500).json({ success: false, message: "Can not find bicycles in the database", details: err });
    }
}
