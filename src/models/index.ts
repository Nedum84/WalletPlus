"use strict";
import { User } from "./user.model";
import { Points } from "./points.model";
import { Wallet } from "./wallet.model";
import { sequelize } from "./db.con";

export const runRelationship = async () => {
  await sequelize.sync({ force: true });
  //--> Users
  User.hasMany(Wallet, {
    foreignKey: "user_id",
  });
  //--> Users
  User.hasMany(Wallet, {
    foreignKey: "user_id",
  });
  //--> wallet
  Wallet.hasOne(User, {
    foreignKey: "user_id",
  });
  //-->Points
  Points.hasOne(User, {
    foreignKey: "user_id",
  });
};
