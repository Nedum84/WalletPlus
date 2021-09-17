import { Sequelize } from "sequelize";
import { Model, Optional, DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { sequelize } from "./db.con";

export interface WalletAttributes {
  id: number;
  transaction_ref: string;
  user_id: number;
  amount: number;
  version?: number;
}

interface WalletCreationAttributes extends Optional<WalletAttributes, "id"> {}

interface WalletInstance
  extends Model<WalletAttributes, WalletCreationAttributes>,
    WalletAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const Wallet = sequelize.define<WalletInstance>(
  "Wallet",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      comment: "Wallet Id",
    },
    transaction_ref: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "Wallet",
    freezeTableName: true,
    version: true,
  }
);

export { Wallet };
