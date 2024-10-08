import { Model, DataTypes, Sequelize } from "sequelize";
import { AuditLogAttributes } from "../types/audit.type";
export class AuditLog
  extends Model<AuditLogAttributes>
  implements AuditLogAttributes
{
  public id!: number;
  public entityType!: string;
  public entityId!: number;
  public action!: "CREATE" | "UPDATE" | "DELETE";
  public oldValues!: object;
  public newValues!: object;
  public userId!: number;
  public readonly createdAt!: Date;
}

export const initAuditLogModel = (sequelize: Sequelize) => {
  AuditLog.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      entityType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      entityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      action: {
        type: DataTypes.ENUM("CREATE", "UPDATE", "DELETE"),
        allowNull: false,
      },
      oldValues: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      newValues: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "audit_logs",
    }
  );
};
