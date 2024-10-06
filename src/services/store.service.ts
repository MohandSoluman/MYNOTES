import { StoreRepository, CreateStoreDTO, UpdateStoreDTO } from "../types/store.type";
import { NotFoundError } from "../utils/error";

export class StoreService {
  constructor(private repository: StoreRepository) {}

  async getAllStores() {
    return await this.repository.findAll();
  }

  async getStoreById(id: number) {
    const store = await this.repository.findById(id);
    if (!store) throw new NotFoundError("store not found");
    return store;
  }

  async createStore(data: CreateStoreDTO) {
    return await this.repository.create(data);
  }

  async updateStore(id: number, data: UpdateStoreDTO) {
    const store = await this.repository.update(id, data);
    if (!store) throw new NotFoundError("Store not found");
    return store;
  }

  async deleteStore(id: number) {
    const success = await this.repository.delete(id);
    if (!success) throw new NotFoundError("store not found");
  }
}
