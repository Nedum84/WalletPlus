import config from "./config";

// database config for either development or production
require("dotenv").config();

export default {
  development: {
    dbname: process.env.DB_NAME!,
    username: process.env.DB_USERNAME!,
    password: process.env.DB_PASSWORD!,
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
    port: Number(process.env.DB_PORT) || 5432,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  test: {
    dbname: process.env.DB_TEST_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false,
    port: Number(process.env.DB_PORT_TEST) || 5432,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  production: {
    dbname: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
};
