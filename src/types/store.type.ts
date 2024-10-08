export interface StoreType {
  id?: number; // Auto-generated, should be optional
  storeName: string;
  code: string;
  address: string;
  created_at?: Date; // Optional because Sequelize will manage this
  updated_at?: Date; // Optional because Sequelize will manage this
}

export type CreateStoreDTO = Omit<
  StoreType,
  "id" | "created_at" | "updated_at"
>;
export interface UpdateStoreDTO {
  storeName?: string;
  code?: string;
  address?: string;
}
export interface StoreRepository {
  findAll(): Promise<StoreType[]>;
  findById(id: number): Promise<StoreType | null>;
  create(data: CreateStoreDTO): Promise<StoreType>;
  update(id: number, data: UpdateStoreDTO): Promise<StoreType | null>;
  delete(id: number): Promise<boolean>;
}
