import { Sequelize } from "sequelize";
import { Note } from "../model/note.model";

const sequelize = new Sequelize(process.env.DATABASE_URL!, {
  dialect: "postgres",
  logging: process.env.NODE_ENV === "development" ? console.log : false,
});

export async function initializeDatabase(): Promise<void> {
  try {
    Note.initModel(sequelize);

    await sequelize.authenticate();
    console.log("Database connection established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    throw error;
  }
}

export default sequelize;
