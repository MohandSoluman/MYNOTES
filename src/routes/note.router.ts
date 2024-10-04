import { Router } from "express";
import { NoteController } from "../controllers/note.controller";
import { NoteService } from "../services/note.service";
import { SequelizeNoteRepository } from "../repositories/note.repository";

const router = Router();

const noteRepository = new SequelizeNoteRepository();
const noteService = new NoteService(noteRepository);
const noteController = new NoteController(noteService);

router
  .route("/")
  .post(noteController.createNote)
  .get(noteController.getAllNotes);
router
  .route("/:id")
  .get(noteController.getNoteById)
  .put(noteController.updateNote)
  .delete(noteController.deleteNote);

export default router;
