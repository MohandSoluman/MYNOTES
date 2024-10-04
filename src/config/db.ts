import { Sequelize } from "sequelize";
require("dotenv").config();
const connctionString = process.env.DATABASE_URL || "";

class DatabaseConnection {
  private static instance: Sequelize;

  private constructor() {}

  public static getConnection(): Sequelize {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new Sequelize(connctionString, {
        dialect: "postgres",
        logging: false,
      });
    }
    return DatabaseConnection.instance;
  }
}

export default DatabaseConnection;
