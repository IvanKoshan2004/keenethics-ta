import { Request, Response } from "express";
import { BicycleModel } from "../../../models/bicycle.model";

export async function createBicycle(req: Request, res: Response) {
    const newBicycle = new BicycleModel({ ...req.body });
    try {
        const bicycleDocument = await newBicycle.save();
        return res.status(201).json({ success: true, data: { bicycle: bicycleDocument } });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Can not save the bicycle in the database", details: err });
    }
}
