import { Model, DataTypes, Sequelize } from "sequelize";
import { BookType } from "../types/book.type";

export class Book extends Model<BookType> implements BookType {
  public id!: number;
  public title!: string;
  public isBn!: boolean;
  public description!: string;
  public publisher!: string;
  public author!: string;
  public pages!: number;
  public created_at!: Date;
  public updated_at!: Date;

  public static initModel(sequelize: Sequelize): void {
    Book.init(
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
        isBn: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        publisher: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        author: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        pages: {
          type: DataTypes.NUMBER,
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
        tableName: "Books",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
      }
    );
  }
}
