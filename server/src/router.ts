import { Router } from "express";

const bicycleRouter = Router();

bicycleRouter.get("", (req, res) => {});
bicycleRouter.get(":id", (req, res) => {});
bicycleRouter.post("", (req, res) => {});
bicycleRouter.patch(":id", (req, res) => {});
bicycleRouter.delete(":id", (req, res) => {});

export default bicycleRouter;
