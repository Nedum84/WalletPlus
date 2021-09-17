import express from "express";
import { requireAuth } from "../middlewares/auth.middleware";
import transController from "../controller/transactions.controller";
import transValidation from "../validations/transaction.validation";
import validate from "../middlewares/validate";

const router = express.Router();

router.use(requireAuth);

router.post(
  "/addmoney",
  validate(transValidation.addMoney),
  transController.addMoneyToWallet
);
router.post(
  "/sendmoney",
  validate(transValidation.sendMoney),
  transController.sendMoneyToUser
);
router.get("/transaction", transController.getTransactions);
router.get("/balance", transController.getBalance);
export default router;
