import { Model, DataTypes, Sequelize } from "sequelize";
import { AuditLogAttributes } from "../types/audit.type";

export class AuditLog
  extends Model<AuditLogAttributes>
  implements AuditLogAttributes
{
  public id!: number;
  public entity_type!: string;
  public entity_id!: number;
  public action!: "CREATE" | "UPDATE" | "DELETE";
  public old_values!: object;
  public new_values!: object;
  public user_id!: number;
  public readonly created_at!: Date;

  public static initModel(sequelize: Sequelize): void {
    AuditLog.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        entity_type: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        entity_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        action: {
          type: DataTypes.ENUM("CREATE", "UPDATE", "DELETE"),
          allowNull: false,
        },
        new_values: {
          type: DataTypes.JSONB,
          allowNull: true,
        },
        old_values: {
          type: DataTypes.JSONB,
          allowNull: true,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: "audit_logs",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: false, // Since your table doesn't have an updated_at column
        underscored: true, // This ensures Sequelize uses snake_case
      }
    );
  }
}
