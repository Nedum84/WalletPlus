import { Model, Optional, DataTypes } from "sequelize";
import { sequelize } from "./db.con";
import { Points } from "./points.model";
import { Wallet } from "./wallet.model";

export interface UserAttributes {
  user_id: number;
  uuid: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  version?: number;
}

interface UserCreationAttributes extends Optional<UserAttributes, "user_id"> {}

interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const User = sequelize.define<UserInstance>(
  "User",
  {
    user_id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      comment: "Users Id",
    },
    uuid: {
      type: DataTypes.UUID,
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    tableName: "User",
    version: true,
    freezeTableName: true,
    hooks: {
      beforeCreate: async (user: UserInstance) => {
        // user.password = await UserUtils.hashPassword(user.password);
      },
    },
  }
);

User.prototype.toJSON = function () {
  const values = { ...this.get() };
  delete values.password;
  return values;
};
// User.hasMany(Wallet, {
//   foreignKey: "user_id",
// });
// User.hasMany(Points, {
//   foreignKey: "user_id",
// });
export { User };
