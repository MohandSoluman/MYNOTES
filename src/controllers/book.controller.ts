import { BookService } from "../services/book.service";
import { CreateBookDTO, UpdateBookDTO } from "../types/book.type";
import { BaseController } from "./base.controller";

export class BookController extends BaseController<
  any,
  CreateBookDTO,
  UpdateBookDTO
> {
  constructor(private bookService: BookService) {
    super(bookService);
  }
}
