import { Model, DataTypes, Sequelize } from "sequelize";
import { IUser } from "../../interfaces/user.interface";

export class User extends Model<IUser> {
  public id!: number;
  public user_name!: string;
  public user_type_code!: string;
  public email!: string;
  public password!: string;
  public isActive!: boolean;
  public create_by!: number;
  public created_at!: Date;
  public updated_at!: Date;

  public static initModel(sequelize: Sequelize): void {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        user_name: {
          type: DataTypes.STRING(255),
          allowNull: false,
          unique: true,
        },
        user_type_code: {
          type: DataTypes.STRING(50),
          allowNull: false,
          references: {
            model: "user_types",
            key: "code",
          },
          onDelete: "RESTRICT",
          onUpdate: "CASCADE",
        },
        email: {
          type: DataTypes.STRING(255),
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        isActive: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
        },
        create_by: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        created_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
        updated_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        tableName: "users",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
      }
    );
  }
}
