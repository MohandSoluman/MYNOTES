import { Book } from "../model/book.model";
import { Store } from "../model/store.model";
import {
  BookRepository,
  CreateBookDTO,
  UpdateBookDTO,
} from "../types/book.type";
import { logger } from "../utils/logger";
import { BaseRepository } from "./base.repository";

export class SequelizeBookRepository
  extends BaseRepository<Book>
  implements BookRepository
{
  constructor(userId: number) {
    super(Book, userId, "Book");
  }
  async create(data: Omit<CreateBookDTO, "id">) {
    try {
      const store = await Store.findByPk(data.storeId);
      if (!store) {
        logger.error("Store not found for book creation", data.storeId as any);
        throw new Error(`Store with id ${data.storeId} does not exist`);
      }
      return super.create(data);
    } catch (error) {
      logger.error("Failed to create book", { error, data } as any);
      throw error;
    }
  }
  async findByAuthor(author: string) {
    try {
      logger.info("Finding books by author", author);
      return await this.model.findAll({
        where: { author },
      });
    } catch (error) {
      logger.error("Failed to find books by author", { error, author } as any);
      throw error;
    }
  }
}
