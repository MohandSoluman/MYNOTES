import { Application } from "express";
import { Server } from "http";
import { Sequelize } from "sequelize";
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../src/app";
import { Store } from "../src/model/store.model";

chai.use(chaiHttp);
chai.should();

let server: Server;
let sequelize: Sequelize;

export const setupTestDb = async () => {
  // Use a different database for testing
  sequelize = new Sequelize({
    dialect: "postgres",
    database: process.env.TEST_DB_NAME || "test_database",
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "password",
    host: process.env.DB_HOST || "localhost",
    logging: false,
  });

  // Sync all models
  await sequelize.sync({ force: true });
};

export const startServer = (): Application => {
  server = app.listen(0); // random port
  return app;
};

export const stopServer = async () => {
  if (server) {
    await new Promise((resolve) => server.close(resolve));
  }
  if (sequelize) {
    await sequelize.close();
  }
};
