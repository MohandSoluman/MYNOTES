import {
  CreateStoreDTO,
  UpdateStoreDTO,
} from "../interfaces/store.interface";
import { NotFoundError } from "../Errors/api.error";
import { StoreRepository } from "../repositories/store.repository";

export class StoreService {
  constructor(private repository: StoreRepository) {}

  async getAll() {
    return await this.repository.findAll();
  }

  async getById(id: number) {
    const store = await this.repository.findById(id);
    if (!store) throw new NotFoundError("store not found");
    return store;
  }

  async create(data: CreateStoreDTO) {
    return await this.repository.create(data);
  }

  async update(id: number, data: UpdateStoreDTO) {
    const store = await this.repository.update(id, data);
    if (!store) throw new NotFoundError("Store not found");
    return store;
  }

  async delete(id: number) {
    const success = await this.repository.delete(id);
    if (!success) throw new NotFoundError("store not found");
  }
}
