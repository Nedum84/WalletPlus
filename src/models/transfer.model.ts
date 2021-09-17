import { Sequelize } from "sequelize";
import { Model, Optional, DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { sequelize } from "./db.con";

export interface TransferAttributes {
  id: number;
  from: number;
  to: number;
  amount: number;
  version?: number;
}

interface TransferCreationAttributes
  extends Optional<TransferAttributes, "id"> {}

interface TransferInstance
  extends Model<TransferAttributes, TransferCreationAttributes>,
    TransferAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const Transfer = sequelize.define<TransferInstance>(
  "Transfer",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      comment: "Transfer Id",
    },
    from: {
      type: DataTypes.INTEGER,
    },
    to: {
      type: DataTypes.INTEGER,
    },
    amount: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "Transfer",
    version: true,
  }
);

export { Transfer };
