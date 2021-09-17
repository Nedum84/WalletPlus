import path from "path";
import config from "./config";

require("dotenv").config();

export default {
  development: {
    username: "root",
    password: "root",
    host: "0.0.0.0",
    dialect: "sqlite",
    storage: path.join(__dirname, "..", "database/wallet_plus.sqlite"),
    // port: Number(process.env.DB_PORT) || 5432,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  test: {
    username: "root",
    password: "root",
    host: "0.0.0.0",
    dialect: "sqlite",
    logging: false,
    storage: path.join(__dirname, "..", "database/wallet_plus_test.sqlite"),
    // port: Number(process.env.DB_PORT_TEST) || 5432,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  production: {
    // dbname: process.env.DB_NAME,
    // username: process.env.DB_USERNAME,
    // password: process.env.DB_PASSWORD,
    // host: process.env.DB_HOST,
    username: "root",
    password: "root",
    host: "0.0.0.0",
    dialect: "sqlite",
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
};
