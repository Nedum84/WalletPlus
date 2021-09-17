import { Model, Optional, DataTypes } from "sequelize";
import { sequelize } from "./db.con";

export interface PointsAttributes {
  id: number;
  transaction_amount: number;
  point_earned: number;
  user_id: number;
  version?: number;
}

interface PointsCreationAttributes extends Optional<PointsAttributes, "id"> {}

interface PointsInstance
  extends Model<PointsAttributes, PointsCreationAttributes>,
    PointsAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const Points = sequelize.define<PointsInstance>(
  "Points",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    transaction_amount: {
      type: DataTypes.BIGINT,
    },
    point_earned: {
      type: DataTypes.BIGINT,
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    tableName: "Points",
    version: true,
    freezeTableName: true,
  }
);

export { Points };
