import { Request, Response } from "express";
import { Sequelize } from "sequelize";
import ApiResponse from "../apiresponse/api.response";
import { ErrorResponse } from "../apiresponse/error.response";
import { Points } from "../models/points.model";
import { Transfer } from "../models/transfer.model";
import { Wallet } from "../models/wallet.model";
import { calcPoints, makeRand } from "../utils/helpers";
import authService from "./auth.service";

const addMoneyToWallet = async (amount: number, user_id: number) => {
  const user = await authService.getUserById(user_id);
  const transaction_ref = makeRand();

  const wallet = await Wallet.create({
    amount,
    transaction_ref,
    user_id,
  });

  let point_earn = null;
  if (amount >= 5000) {
    const points = calcPoints(amount);
    point_earn = await Points.create({
      point_earned: points,
      transaction_amount: amount,
      user_id,
    });
  }

  return {
    wallet,
    point_earn,
  };
};
const sendMoneyToUser = async (from: number, to: number, amount: number) => {
  //Check if user(FROM & TO) exists
  await authService.getUserById(from);
  await authService.getUserById(to);

  const balance = await getBalance(from);
  if (balance < amount) {
    throw new ErrorResponse("Insufficient balance");
  }

  const transfer = await Transfer.create({
    amount,
    from,
    to,
  });

  return transfer;
};
const getTransactions = async (user_id: number) => {
  const wallet_transactions = await Wallet.findAll({ where: { user_id } });
  const transfers = await Transfer.findAll({ where: { from: user_id } });

  return {
    wallet_transactions,
    transfers,
  };
};

const getBalance = async (user_id: number) => {
  const total = await Wallet.findAll({
    where: { user_id },
    attributes: [
      [Sequelize.fn("sum", Sequelize.col("amount")), "total_amount"],
    ],
    raw: true,
  });
  //   const balance = transactions
  //     .map((t) => t.amount)
  //     .reduce((prev, next) => prev + next);
  //--> Transfers
  const transfers = await Transfer.findAll({
    where: { from: user_id },
    attributes: [
      [Sequelize.fn("sum", Sequelize.col("amount")), "total_transfer"],
    ],
    raw: true,
  });

  //@ts-ignore
  const topUp = parseInt(total[0]?.total_amount ?? 0);
  //@ts-ignore
  const transfer = parseInt(transfers[0]?.total_transfer ?? 0);
  const balance = topUp - transfer;
  return balance ?? 0;
};

const getPoints = async (user_id: number) => {
  const total = await Points.findAll({
    where: { user_id },
    attributes: [
      [Sequelize.fn("sum", Sequelize.col("point_earned")), "total_point"],
    ],
    raw: true,
  });

  //@ts-ignore
  return parseInt(total[0]?.total_point ?? 0);
};

export = {
  getPoints,
  addMoneyToWallet,
  sendMoneyToUser,
  getTransactions,
  getBalance,
};
