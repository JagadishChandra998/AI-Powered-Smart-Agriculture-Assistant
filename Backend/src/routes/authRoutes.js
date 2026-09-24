import express from "express";
import {authMiddleware} from "../middleware/authMiddleware.js"
import { registerUser,loginUser,getProfile } from "../controllers/authController.js";

const routes = express.Router();

routes.post("/register",registerUser);
routes.post("/login",loginUser);
routes.get("/profile",authMiddleware,getProfile);

export default routes;