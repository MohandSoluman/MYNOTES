import { Model, DataTypes, Sequelize } from "sequelize";
import { IUserType } from "../../interfaces/user.interface";

export class UserType extends Model<IUserType> {
  public id!: number;
  public name!: string;
  public code!: string;

  public static initModel(sequelize: Sequelize): void {
    UserType.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        code: {
          type: DataTypes.STRING(50),
          allowNull: false,
          unique: true,
        },
      },
      {
        sequelize,
        tableName: "user_types",
        timestamps: false,
      }
    );
  }
}
