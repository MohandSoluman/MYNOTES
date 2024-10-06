import { Request, Response, NextFunction } from "express";
import { BookService } from "../services/book.service";
import { CreateBookDTO, UpdateBookDTO } from "../types/book.type";

export class BookController {
  constructor(private bookService: BookService) {}

  getAllBooks = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const books = await this.bookService.getAllBooks();
      res.json(books);
    } catch (error) {
      next(error);
    }
  };

  getBookById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const book = await this.bookService.getBookById(Number(req.params.id));
      res.json(book);
    } catch (error) {
      next(error);
    }
  };

  createBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: CreateBookDTO = req.body;
      const book = await this.bookService.createBook(data);
      res.status(201).json(book);
    } catch (error) {
      next(error);
    }
  };

  updateBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const data: UpdateBookDTO = req.body;
      const book = await this.bookService.updateBook(id, data);
      res.json(book);
    } catch (error) {
      next(error);
    }
  };

  deleteBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.bookService.deleteBook(Number(req.params.id));
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
