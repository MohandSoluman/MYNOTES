import { Model, DataTypes, Sequelize } from "sequelize";
import { INote } from "../interfaces/note.interface";

export class Note extends Model<INote> {
  public id!: number;
  public title!: string;
  public content!: string | null;
  public created_at?: Date;
  public updated_at?: Date;
  public static initModel(sequelize: Sequelize): void {
    Note.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        title: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: true,
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
        tableName: "notes",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
      }
    );
  }
}
