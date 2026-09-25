import express from "express";
import { createFarm,getfarmById,getfarms,updateFarm,deleteFarm } from "../controllers/farmController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const routes = express.Router();

routes.post("/",authMiddleware,createFarm);
routes.get("/",authMiddleware,getfarms);
routes.get("/:id",authMiddleware,getfarmById);
routes.put("/:id",authMiddleware,updateFarm);
routes.delete("/:id",authMiddleware,deleteFarm);

export default routes;

