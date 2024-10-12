import { AuditLog } from "../model/auditLog.model";
import { AuditRepository } from "../repositories/audit.repository";

export class AuditService {
  constructor(private repository: AuditRepository) {}
  async getAuditTrail(entityType: string, entityId: number) {
    // return await this.repository.findAll({
    //   where: {
    //     entityType,
    //     entityId,
    //   },
    //   order: [["created_at", "DESC"]],
    // });
  }

  async getAuditsByUser(userId: number) {
    // return await this.repository.findAll({
    //   where: { userId },
    //   order: [["created_at", "DESC"]],
    // });
  }

  async getRecentAudits(limit = 10) {
    // return await this.repository.findAll({
    //   order: [["created_at", "DESC"]],
    //   limit,
    // });
  }
}
