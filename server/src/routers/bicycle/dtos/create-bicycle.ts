import { Joi } from "express-validation";
export const createBicycleDto = {
    body: Joi.object({
        name: Joi.string().min(5).required(),
        type: Joi.string().min(5).required(),
        color: Joi.string().min(5).required(),
        description: Joi.string().min(5).required(),
        wheelSize: Joi.number().required(),
        price: Joi.number().required(),
    }),
};
