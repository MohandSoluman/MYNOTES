import { Model, DataTypes, Sequelize } from "sequelize";
import { IUserGroup } from "../../interfaces/user.interface";

export class UserGroup extends Model<IUserGroup> {
  public id!: number;
  public user_id!: number;
  public group_id!: number;

  public static initModel(sequelize: Sequelize): void {
    UserGroup.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "users",
            key: "id",
          },
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        },
        group_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "groups",
            key: "id",
          },
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        },
      },
      {
        sequelize,
        tableName: "user_group",
        timestamps: false,
      }
    );
  }
}
