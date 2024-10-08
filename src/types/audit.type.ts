export interface AuditLogAttributes {
  id?: number;
  entityType: string;
  entityId: number;
  action: "CREATE" | "UPDATE" | "DELETE";
  userId: number;
  oldValues?: object; // Previous values (for updates)
  newValues?: object; // New values (for creates/updates)
  created_at?: Date;
}
