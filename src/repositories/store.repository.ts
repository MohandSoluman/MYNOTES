import { Store } from "../model/store.model";
import { IStoreRepository } from "../interfaces/store.interface";

import { BaseRepository } from "./base.repository";

export class StoreRepository
  extends BaseRepository<Store>
  implements IStoreRepository
{
  constructor(userId: number) {
    super(Store, userId, "Store");
  }

  // async findByLocation(title: string) {
  //   try {
  //     logger.info("Finding stores by location", title);
  //     return await this.model.findAll({
  //       where: { title },
  //     });
  //   } catch (error) {
  //     logger.error("Failed to find stores by location", {
  //       error,
  //       location,
  //     } as any);
  //     throw error;
  //   }
  // }
}
