import {
  BookRepository,
  CreateBookDTO,
  UpdateBookDTO,
} from "../types/book.type";
import { NotFoundError } from "../utils/error";

export class BookService {
  constructor(private repository: BookRepository) {}

  async getAllBooks() {
    return await this.repository.findAll();
  }

  async getBookById(id: number) {
    const book = await this.repository.findById(id);
    if (!book) throw new NotFoundError("Book not found");
    return book;
  }

  async createBook(data: CreateBookDTO) {
    return await this.repository.create(data);
  }

  async updateBook(id: number, data: UpdateBookDTO) {
    const book = await this.repository.update(id, data);
    if (!book) throw new NotFoundError("Book not found");
    return book;
  }

  async deleteBook(id: number) {
    const success = await this.repository.delete(id);
    if (!success) throw new NotFoundError("Book not found");
  }
}
