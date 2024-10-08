import { Store } from "../model/store.model";
import {
  StoreRepository,
  CreateStoreDTO,
  UpdateStoreDTO,
} from "../types/store.type";
import { logger } from "../utils/logger";
import { BaseRepository } from "./base.repository";

export class SequelizeStoreRepository
  extends BaseRepository<Store>
  implements StoreRepository
{
  constructor(userId: number) {
    super(Store, userId, "Store");
  }

  async findByLocation(location: string) {
    try {
      logger.info("Finding stores by location", location);
      return await this.model.findAll({
        where: { location },
      });
    } catch (error) {
      logger.error("Failed to find stores by location", {
        error,
        location,
      } as any);
      throw error;
    }
  }
}
