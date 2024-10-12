import { Router } from "express";
import { BookController } from "../controllers/book.controller";
import { BookService } from "../services/book.service";
import { BookRepository } from "../repositories/book.repository";

const router = Router();
const userId = 2;
const bookRepository = new BookRepository(userId);
const bookService = new BookService(bookRepository);
const bookController = new BookController(bookService);

router.route("/").post(bookController.create).get(bookController.getAll);
router
  .route("/:id")
  .get(bookController.getById)
  .put(bookController.update)
  .delete(bookController.delete);

export default router;
