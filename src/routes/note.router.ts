import { Router } from "express";
import { NoteController } from "../controllers/note.controller";
import { NoteService } from "../services/note.service";
import { SequelizeNoteRepository } from "../repositories/note.repository";

const router = Router();
const userId = 2;
const noteRepository = new SequelizeNoteRepository(userId);
const noteService = new NoteService(noteRepository);
const noteController = new NoteController(noteService);

router
  .route("/")
  .post(noteController.create)
  .get(noteController.getAll);
router
  .route("/:id")
  .get(noteController.getById)
  .put(noteController.update)
  .delete(noteController.delete);

export default router;
