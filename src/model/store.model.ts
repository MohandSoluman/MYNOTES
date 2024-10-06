import { Model, DataTypes, Sequelize } from "sequelize";
import { StoreType } from "../types/store.type";

export class Store extends Model<StoreType> implements StoreType {
  public id!: number;
  public storeName!: string;
  public code!: string;
  public address!: string;
  public created_at!: Date;
  public updated_at!: Date;

  public static initModel(sequelize: Sequelize): void {
    Store.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        storeName: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        code: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        address: {
          type: DataTypes.STRING(255),
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
        tableName: "stores",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
      }
    );
  }
}
