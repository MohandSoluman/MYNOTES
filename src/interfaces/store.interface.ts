export interface IStore {
  id?: number; // Auto-generated, should be optional
  storeName: string;
  code: string;
  address: string;
  created_at?: Date; // Optional because Sequelize will manage this
  updated_at?: Date; // Optional because Sequelize will manage this
}

export type CreateStoreDTO = Omit<IStore, "id" | "created_at" | "updated_at">;
export interface UpdateStoreDTO {
  storeName?: string;
  code?: string;
  address?: string;
}
export interface IStoreRepository {
  findAll(): Promise<IStore[]>;
  findById(id: number): Promise<IStore | null>;
  create(data: CreateStoreDTO): Promise<IStore>;
  update(id: number, data: UpdateStoreDTO): Promise<IStore | null>;
  delete(id: number): Promise<boolean>;
}
