import { NextFunction, Request, Response } from "express";
import { ValidationError } from "express-validation";

export default function validationErrorFilter(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof ValidationError) {
        return res.status(err.statusCode).json({
            success: false,
            message: "Validation failed",
            details: err.details,
        });
    }
    return res.status(500).send(err);
}
