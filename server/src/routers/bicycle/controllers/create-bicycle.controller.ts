import { Request, Response } from "express";
import { BicycleModel } from "../../../models/bicycle.model";
import { generateBikeId } from "../../../lib/generate-bike-id";
export async function createBicycle(req: Request, res: Response) {
    const id = req.body.id ? req.body.id + "-" + (Date.now() % 100000) : generateBikeId();
    const newBicycle = new BicycleModel({ ...req.body, id });
    try {
        const bicycleDocument = await newBicycle.save();
        return res.status(201).json({ success: true, data: { bicycle: bicycleDocument } });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Can not save the bicycle in the database", details: err });
    }
}
