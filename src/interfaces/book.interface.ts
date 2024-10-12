export interface IBook {
  id?: number;
  storeId: number; // Auto-generated, should be optional
  isBn: boolean;
  title: string;
  publisher: string;
  description: string;
  author: string;
  pages: number;
  created_at?: Date; // Optional because Sequelize will manage this
  updated_at?: Date; // Optional because Sequelize will manage this
}

export type CreateBookDTO = Omit<IBook, "id" | "created_at" | "updated_at">;
export interface UpdateBookDTO {
  title?: string;
  content?: string;
}
export interface IBookRepository {
  findAll(): Promise<IBook[]>;
  findById(id: number): Promise<IBook | null>;
  create(data: CreateBookDTO): Promise<IBook>;
  update(id: number, data: UpdateBookDTO): Promise<IBook | null>;
  delete(id: number): Promise<boolean>;
}
