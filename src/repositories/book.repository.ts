import { Book } from "../model/book.model";
import {
  BookRepository,
  CreateBookDTO,
  UpdateBookDTO,
} from "../types/book.type";

export class SequelizeBookRepository implements BookRepository {
  async create(data: CreateBookDTO) {
    return await Book.create(data);
  }
  async findAll() {
    return await Book.findAll();
  }

  async findById(id: number) {
    return await Book.findByPk(id);
  }

  async update(id: number, data: UpdateBookDTO) {
    const book = await Book.findByPk(id);
    if (!book) return null;
    return await book.update(data);
  }

  async delete(id: number) {
    const book = await Book.findByPk(id);
    if (!book) return false;
    await book.destroy();
    return true;
  }
}
