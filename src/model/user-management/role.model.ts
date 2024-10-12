import { Model, DataTypes, Sequelize } from "sequelize";
import { IRole } from "../../interfaces/user.interface";

export class Role extends Model<IRole> {
  public id!: number;
  public role_name!: string;

  public static initModel(sequelize: Sequelize): void {
    Role.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        role_name: {
          type: DataTypes.STRING(100),
          allowNull: false,
          unique: true,
        },
      },
      {
        sequelize,
        tableName: "roles",
        timestamps: false,
      }
    );
  }
}
