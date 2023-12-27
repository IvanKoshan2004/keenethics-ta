import { Request, Response } from "express";
import { BicycleModel } from "../../../models/bicycle.model";

export async function changeBicycleStatus(req: Request, res: Response) {
    const { id } = req.params;
    const status = req.body.status;
    try {
        const bicycle = await BicycleModel.findByIdAndUpdate(id, { status }, { new: true });
        if (!bicycle) {
            return res.status(404).json({ success: false, message: "Bicycle with this id not found" });
        }
        return res.status(201).json({ success: true, data: { bicycle } });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Can not save the bicycle in the database", details: err });
    }
}
