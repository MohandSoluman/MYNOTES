import { AuditLog } from "../model/auditLog.model";

export class AuditService {
  async getAuditTrail(entityType: string, entityId: number) {
    return await AuditLog.findAll({
      where: {
        entityType,
        entityId,
      },
      order: [["created_at", "DESC"]],
    });
  }

  async getAuditsByUser(userId: number) {
    return await AuditLog.findAll({
      where: { userId },
      order: [["created_at", "DESC"]],
    });
  }

  async getRecentAudits(limit = 10) {
    return await AuditLog.findAll({
      order: [["created_at", "DESC"]],
      limit,
    });
  }
}
