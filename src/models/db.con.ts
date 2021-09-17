"use strict";
import { Dialect, Sequelize } from "sequelize";
import dbConfig from "../config/db.config";
import config from "../config/config";
import pg from "pg";
pg.defaults.parseInt8 = true; //Convert Int returned as strings to Int...
// require("pg").defaults.parseInt8 = true; //Convert Int returned as strings to Int...

// @ts-ignore
const database = dbConfig[config.env] || dbConfig.development;

export const sequelize = new Sequelize(
  database.dbname,
  database.username,
  database.password,
  {
    ...database,
    dialect: database.dialect as Dialect,
  }
);
