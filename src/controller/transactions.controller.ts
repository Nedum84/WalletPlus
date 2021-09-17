import { Request, Response } from "express";
import ApiResponse from "../apiresponse/api.response";
import transactionsService from "../services/transactions.service";

const addMoneyToWallet = async (req: Request, res: Response) => {
  const { user_id } = req.user;
  const { amount } = req.body;

  const result = await transactionsService.addMoneyToWallet(amount, user_id);
  ApiResponse.ok(res, result);
};
const sendMoneyToUser = async (req: Request, res: Response) => {
  const { user_id } = req.user;
  const { to, amount } = req.body;

  const result = await transactionsService.sendMoneyToUser(user_id, to, amount);
  ApiResponse.ok(res, {
    transfer: result,
  });
};
const getTransactions = async (req: Request, res: Response) => {
  const { user_id } = req.user;
  const result = await transactionsService.getTransactions(user_id);
  ApiResponse.ok(res, result);
};
const getBalance = async (req: Request, res: Response) => {
  const { user_id } = req.user;
  const bal = await transactionsService.getBalance(user_id);
  const points = await transactionsService.getPoints(user_id);
  ApiResponse.ok(res, {
    balance: bal,
    point_earn: points,
  });
};

export = {
  addMoneyToWallet,
  sendMoneyToUser,
  getTransactions,
  getBalance,
};
