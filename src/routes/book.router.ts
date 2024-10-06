import { Router } from "express";
import { BookController } from "../controllers/book.controller";
import { BookService } from "../services/book.service";
import { SequelizeBookRepository } from "../repositories/book.repository";

const router = Router();

const bookRepository = new SequelizeBookRepository();
const bookService = new BookService(bookRepository);
const bookController = new BookController(bookService);

router
  .route("/")
  .post(bookController.createBook)
  .get(bookController.getAllBooks);
router
  .route("/:id")
  .get(bookController.getBookById)
  .put(bookController.updateBook)
  .delete(bookController.deleteBook);

export default router;
