import { Store } from "../model/store.model";
import {
  StoreRepository,
  CreateStoreDTO,
  UpdateStoreDTO,
} from "../types/store.type";

export class SequelizeStoreRepository implements StoreRepository {
  async create(data: CreateStoreDTO) {
    return await Store.create(data);
  }
  async findAll() {
    return await Store.findAll();
  }

  async findById(id: number) {
    return await Store.findByPk(id);
  }

  async update(id: number, data: UpdateStoreDTO) {
    const store = await Store.findByPk(id);
    if (!store) return null;
    return await store.update(data);
  }

  async delete(id: number) {
    const store = await Store.findByPk(id);
    if (!store) return false;
    await Store.destroy();
    return true;
  }
}
