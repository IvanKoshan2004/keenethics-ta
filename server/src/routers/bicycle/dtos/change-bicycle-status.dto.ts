import { Joi } from "express-validation";
export const changeBicycleStatusDto = {
    body: Joi.object({
        status: Joi.string().valid("available", "unavailable", "busy"),
    }),
};
