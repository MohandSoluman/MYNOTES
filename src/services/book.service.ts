import { CreateBookDTO, UpdateBookDTO } from "../interfaces/book.interface";
import { NotFoundError } from "../Errors/api.error";
import { BookRepository } from "../repositories/book.repository";

export class BookService {
  constructor(private repository: BookRepository) {}

  async getAll() {
    return await this.repository.findAll();
  }

  async getById(id: number) {
    const book = await this.repository.findById(id);
    if (!book) throw new NotFoundError("Book not found");
    return book;
  }

  async create(data: CreateBookDTO) {
    return await this.repository.create(data);
  }

  async update(id: number, data: UpdateBookDTO) {
    const book = await this.repository.update(id, data);
    if (!book) throw new NotFoundError("Book not found");
    return book;
  }

  async delete(id: number) {
    const success = await this.repository.delete(id);
    if (!success) throw new NotFoundError("Book not found");
  }
}
