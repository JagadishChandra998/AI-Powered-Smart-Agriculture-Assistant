import express from "express";
import { createCrop, getCropByFarm, getCropById,updateCrop,deleteCrop } from "../controllers/cropController.js";
import {authMiddleware} from "../middleware/authMiddleware.js";

const routes = express.Router();

routes.post("/",authMiddleware,createCrop);
routes.get("/farm/:id",authMiddleware,getCropByFarm);
routes.get("/:id",authMiddleware,getCropById);
routes.put("/:id",authMiddleware,updateCrop);
routes.delete("/:id",authMiddleware,deleteCrop);

export default routes;