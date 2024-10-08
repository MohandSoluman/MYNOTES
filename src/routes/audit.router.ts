// routes/audit.routes.ts
import { NextFunction, Router } from "express";
import { AuditController } from "../controllers/audit.controller";
import { AuditRepository } from "../repositories/audit.repository";
//import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();
const auditRepository = new AuditRepository();
const auditController = new AuditController(auditRepository);

// Middleware to ensure only authorized users can access audit logs
// const auditAccessMiddleware = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   // Implement your authorization logic here
//   // For example, check if the user has admin role
//   if (!req.user?.isAdmin) {
//     return res.status(403).json({ error: "Access denied" });
//   }
//   next();
// };

// Apply auth and audit access middleware to all audit routes
//router.use(authMiddleware, auditAccessMiddleware);

// Audit routes

router.get("/", auditController.getAuditLogs);
router.get("/user", auditController.getAuditLogsByUser);
router.get("/:id", auditController.getAuditLogById);

router.get(
  "/audit-logs/entity/:entityType/:entityId",
  auditController.getAuditLogsByEntity
);
router.get("/audit-logs/user/:userId", auditController.getAuditLogsByUser);

export default router;
