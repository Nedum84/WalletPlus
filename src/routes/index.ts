import express from "express";
import authRoute from "./auth.route";
import transRoutes from "./transactions.route";
import { requireAuth } from "../middlewares/auth.middleware";

const router = express.Router();

router.use("/auth", authRoute);

router.use("/", transRoutes);

export default router;
