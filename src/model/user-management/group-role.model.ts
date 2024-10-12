import { Model, DataTypes, Sequelize } from "sequelize";
import { IGroupRole } from "../../interfaces/user.interface";

export class GroupRole extends Model<IGroupRole> {
  public id!: number;
  public group_id!: number;
  public role_id!: number;

  public static initModel(sequelize: Sequelize): void {
    GroupRole.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
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
        role_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "roles",
            key: "id",
          },
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        },
      },
      {
        sequelize,
        tableName: "group_role",
        timestamps: false,
      }
    );
  }
}
