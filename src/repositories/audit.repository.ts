import { Op } from "sequelize";
import { AuditLog } from "../model/auditLog.model";
import { logger } from "../utils/logger";

export interface AuditQueryOptions {
  entityType?: string;
  entityId?: number;
  userId?: number;
  action?: "CREATE" | "UPDATE" | "DELETE";
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
}

export class AuditRepository {
  async findAll(options: AuditQueryOptions = {}) {
    try {
      const where: any = {};

      if (options.entityType) where.entityType = options.entityType;
      if (options.entityId) where.entityId = options.entityId;
      if (options.userId) where.userId = options.userId;
      if (options.action) where.action = options.action;

      if (options.startDate || options.endDate) {
        where.createdAt = {};
        if (options.startDate) where.createdAt[Op.gte] = options.startDate;
        if (options.endDate) where.createdAt[Op.lte] = options.endDate;
      }

      return await AuditLog.findAndCountAll({
        where,
        limit: options.limit || 50,
        offset: options.offset || 0,
        order: [["createdAt", "DESC"]],
      });
    } catch (error) {
      logger.error("Failed to fetch audit logs", { error, options } as any);
      throw error;
    }
  }

  async findById(id: number) {
    try {
      return await AuditLog.findByPk(id);
    } catch (error) {
      logger.error("Failed to fetch audit log by ID", { error, id } as any);
      throw error;
    }
  }

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
