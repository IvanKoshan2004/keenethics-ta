import { Request, Response } from "express";
import { BicycleModel } from "../../../models/bicycle.model";

export async function getBicycleById(req: Request, res: Response) {
    const { id } = req.params;
    try {
        const bicycle = await BicycleModel.findById(id).lean(true);
        if (!bicycle) {
            return res.status(404).json({ success: false, message: "Bicycle with this id not found" });
        }
        return res.status(200).json({ success: true, data: { bicycle } });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Can not find bicycles in the database", details: err });
    }
}
