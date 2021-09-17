import express from "express";
import validate from "../middlewares/validate";
import authController from "../controller/auth.controller";
import authValidation from "../validations/auth.validation";

const router = express.Router();

router.post("/signup", validate(authValidation.signup), authController.signup);
export default router;
