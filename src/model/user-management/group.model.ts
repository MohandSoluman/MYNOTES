import { Model, DataTypes, Sequelize } from "sequelize";
import { IGroup } from "../../interfaces/user.interface";

export class Group extends Model<IGroup> {
  public id!: number;
  public group_name!: string;

  public static initModel(sequelize: Sequelize): void {
    Group.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        group_name: {
          type: DataTypes.STRING(100),
          allowNull: false,
          unique: true,
        },
      },
      {
        sequelize,
        tableName: "groups",
        timestamps: false,
      }
    );
  }
}
