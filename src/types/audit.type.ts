export interface AuditLogAttributes {
  id: number;
  entity_type: string;
  entity_id: number;
  action: "CREATE" | "UPDATE" | "DELETE";
  old_values: object;
  new_values: object;
  user_id: number;
  created_at?: Date;
}
