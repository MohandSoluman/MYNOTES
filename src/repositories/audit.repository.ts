import { AuditLog } from "../model/auditLog.model";
import { logger } from "../utils/logger";
import { BaseRepository } from "./base.repository";
import { IAuditLogAttributes } from "../interfaces/audit.interface";

export class AuditRepository {
  async findByEntityId(entity_type: string, entity_id: number) {
    try {
      return await AuditLog.findAll({
        where: { entity_type, entity_id },
        order: [["createdAt", "DESC"]],
      });
    } catch (error) {
      logger.error("Failed to fetch audit logs by entity", {
        error,
        entity_type,
        entity_id,
      } as any);
      throw error;
    }
  }

  async findByUserId(user_id: number) {
    try {
      return await AuditLog.findAll({
        where: { user_id },
        order: [["createdAt", "DESC"]],
      });
    } catch (error) {
      logger.error("Failed to fetch audit logs by user", {
        error,
        user_id,
      } as any);
      throw error;
    }
  }
}
