import { NextFunction, Request, Response } from "express";
import { AuditRepository } from "../repositories/audit.repository";
import { logger } from "../utils/logger";

export class AuditController {
  constructor(private repository: AuditRepository) {}

  getAuditLogs = async (req: Request, res: Response, next: NextFunction) => {
    // try {
    //   const options: AuditQueryOptions = {
    //     entityType: req.query.entityType as string,
    //     entityId: req.query.entityId
    //       ? parseInt(req.query.entityId as string)
    //       : undefined,
    //     userId: req.query.userId
    //       ? parseInt(req.query.userId as string)
    //       : undefined,
    //     action: req.query.action as "CREATE" | "UPDATE" | "DELETE",
    //     startDate: req.query.startDate
    //       ? new Date(req.query.startDate as string)
    //       : undefined,
    //     endDate: req.query.endDate
    //       ? new Date(req.query.endDate as string)
    //       : undefined,
    //     limit: req.query.limit ? parseInt(req.query.limit as string) : 50,
    //     offset: req.query.offset ? parseInt(req.query.offset as string) : 0,
    //   };
    //   const { rows: auditLogs, count } = await this.repository.findAll(options);
    //   res.json({
    //     data: auditLogs,
    //     meta: {
    //       total: count,
    //       limit: options.limit,
    //       offset: options.offset,
    //     },
    //   });
    // } catch (error) {
    //   logger.error("Error fetching audit logs", {
    //     error,
    //     query: req.query,
    //   } as any);
    //   next(error);
    // }
  };

  getAuditLogById = async (req: Request, res: Response, next: NextFunction) => {
    // try {
    //   const auditLog = await this.repository.findById(parseInt(req.params.id));
    //   // if (!auditLog) {
    //   //   return res.status(404).json({ error: "Audit log not found" });
    //   // }
    //   res.json(auditLog);
    // } catch (error) {
    //   logger.error("Error fetching audit log by ID......", {
    //     error,
    //     id: req.params.id,
    //   } as any);
    //   next(error);
    // }
  };

  getAuditLogsByEntity = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { entityType, entityId } = req.params;
      const auditLogs = await this.repository.findByEntityId(
        entityType,
        parseInt(entityId)
      );
      res.json(auditLogs);
    } catch (error) {
      logger.error("Error fetching audit logs by entity", {
        error,
        params: req.params,
      } as any);
      next(error);
    }
  };

  getAuditLogsByUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = parseInt(req.params.userId);
      const auditLogs = await this.repository.findByUserId(userId);
      res.json(auditLogs);
    } catch (error) {
      logger.error("Error fetching audit logs by user", {
        error,
        userId: req.params.userId,
      } as any);
      next(error);
    }
  };
}
