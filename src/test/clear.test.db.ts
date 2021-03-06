import { sequelize } from "../models/db.con";

const clearTestDb = async () => {
  return Promise.all(
    Object.keys(sequelize.models).map((key) => {
      if (["sequelize", "Sequelize"].includes(key)) return null;
      return sequelize.models[key].destroy({ where: {}, force: true });
    })
  );
};

export = clearTestDb;
