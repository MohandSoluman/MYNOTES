import { Model, ModelStatic } from "sequelize";
import { AuditLog } from "../model/auditLog.model";
import { logger } from "../utils/logger";

interface HasId {
  id: number;
}
export abstract class BaseRepository<T extends Model & HasId> {
  protected constructor(
    protected model: ModelStatic<T>,
    protected userId: number,
    protected entityType: string
  ) {}

  protected async createAuditLog(
    entityId: number,
    action: "CREATE" | "UPDATE" | "DELETE",
    oldValues: object = {},
    newValues: object = {}
  ): Promise<void> {
    try {
      await AuditLog.create({
        entity_type: this.entityType,
        entity_id: entityId,
        action,
        old_values: oldValues || null,
        new_values: newValues || null,
        user_id: this.userId,
      } as any);
    } catch (error) {
      logger.error("Failed to create audit log", {
        error,
        entityType: this.entityType,
        entityId,
        action,
        userId: this.userId,
      } as any);
    }
  }
  async create(data: any) {
    try {
      logger.info(`Creating ${this.entityType}`, { data } as any);
      const instance = await this.model.create(data);
      await this.createAuditLog(instance.id, "CREATE", data);
      return instance;
    } catch (error) {
      logger.error(`Failed to create ${this.entityType}`, {
        error,
        data,
      } as any);
      throw error;
    }
  }
  async update(id: number, data: any) {
    try {
      logger.info(`Updating ${this.entityType}`, { id, data } as any);
      const instance = await this.model.findByPk(id);
      if (!instance) {
        logger.warn(`${this.entityType} not found for update`, id);
        return null;
      }

      const oldData = instance.toJSON();
      const updatedInstance = await instance.update(data);

      await this.createAuditLog(id, "UPDATE", {
        old: oldData,
        new: data,
      });

      return updatedInstance;
    } catch (error) {
      logger.error(`Failed to update ${this.entityType}`, {
        error,
        id,
        data,
      } as any);
      throw error;
    }
  }
  async delete(id: number) {
    try {
      logger.info(`Deleting ${this.entityType}`, id);
      const instance = await this.model.findByPk(id);
      if (!instance) {
        logger.warn(`${this.entityType} not found for deletion`, id);
        return false;
      }

      const instanceData = instance.toJSON();
      await instance.destroy();
      await this.createAuditLog(id, "DELETE", instanceData);

      return true;
    } catch (error) {
      logger.error(`Failed to delete ${this.entityType}`, { error, id } as any);
      throw error;
    }
  }
  async findAll() {
    try {
      logger.info(`Finding all ${this.entityType}s`);
      return await this.model.findAll();
    } catch (error) {
      logger.error(`Failed to find all ${this.entityType}s`, error as Error);
      throw error;
    }
  }
  async findById(id: number) {
    try {
      logger.info(`Finding ${this.entityType} by id`, id);
      return await this.model.findByPk(id);
    } catch (error) {
      logger.error(`Failed to find ${this.entityType} by id`, {
        error,
        id,
      } as any);
      throw error;
    }
  }
}
