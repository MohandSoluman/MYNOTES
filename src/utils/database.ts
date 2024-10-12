import { Sequelize } from "sequelize";
import { Note } from "../model/note.model";
import { Book } from "../model/book.model";
import { Store } from "../model/store.model";
import { AuditLog } from "../model/auditLog.model";
import { User } from "../model/user-management/user.model";
import { GroupRole } from "../model/user-management/group-role.model";
import { Group } from "../model/user-management/group.model";
import { Role } from "../model/user-management/role.model";
import { UserGroup } from "../model/user-management/user-group.model";
import { UserType } from "../model/user-management/user-type.model";

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
    UserType.initModel(sequelize);
    User.initModel(sequelize);
    GroupRole.initModel(sequelize);
    Group.initModel(sequelize);
    Role.initModel(sequelize);
    UserGroup.initModel(sequelize);

    await sequelize.authenticate();
    console.log("Database connection established successfully...........");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    throw error;
  }
}

export default sequelize;
