import { Sequelize } from "sequelize";
import { Note } from "../model/note.model";
import { Book } from "../model/book.model";
import { Store } from "../model/store.model";
import { AuditLog } from "../model/auditLog.model";

const sequelize = new Sequelize(process.env.DATABASE_URL!, {
  dialect: "postgres",
  logging: process.env.NODE_ENV === "development" ? console.log : false,
});

export async function initializeDatabase(): Promise<void> {
  try {
    AuditLog.initModel(sequelize);
    Note.initModel(sequelize);
    Book.initModel(sequelize);
    Store.initModel(sequelize);

    await sequelize.authenticate();
    console.log("Database connection established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    throw error;
  }
}

export default sequelize;
