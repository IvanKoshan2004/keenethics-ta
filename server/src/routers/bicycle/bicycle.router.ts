import { Router } from "express";
import { validate } from "express-validation";
import { createBicycleDto } from "./dtos/create-bicycle";
import { createBicycle } from "./controllers/create-bicycle.controller";
import { getAllBicycles } from "./controllers/get-all-bicycles.controller";
import { getBicycleById } from "./controllers/get-bicycle-by-id.controller";
import { changeBicycleStatus } from "./controllers/change-bicycle-status.controller";
import { deleteBicycle } from "./controllers/delete-bicycle";
import { changeBicycleStatusDto } from "./dtos/change-bicycle-status.dto";

const bicycleRouter = Router();
bicycleRouter.get("", getAllBicycles);
bicycleRouter.get("/:id", getBicycleById);
bicycleRouter.post("", validate(createBicycleDto), createBicycle);
bicycleRouter.patch("/:id", validate(changeBicycleStatusDto), changeBicycleStatus);
bicycleRouter.delete("/:id", deleteBicycle);

export default bicycleRouter;
