export interface BookType {
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

export type CreateBookDTO = Omit<BookType, "id" | "created_at" | "updated_at">;
export interface UpdateBookDTO {
  title?: string;
  content?: string;
}
export interface BookRepository {
  findAll(): Promise<BookType[]>;
  findById(id: number): Promise<BookType | null>;
  create(data: CreateBookDTO): Promise<BookType>;
  update(id: number, data: UpdateBookDTO): Promise<BookType | null>;
  delete(id: number): Promise<boolean>;
}
