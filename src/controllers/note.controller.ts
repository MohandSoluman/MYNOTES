import { Request, Response, NextFunction } from "express";
import { NoteService } from "../services/note.service";
import { CreateNoteDTO, UpdateNoteDTO } from "../types/note.type";

export class NoteController {
  constructor(private noteService: NoteService) {}

  getAllNotes = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const notes = await this.noteService.getAllNotes();
      res.json(notes);
    } catch (error) {
      next(error);
    }
  };

  getNoteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const note = await this.noteService.getNoteById(Number(req.params.id));
      res.json(note);
    } catch (error) {
      next(error);
    }
  };

  createNote = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: CreateNoteDTO = req.body;
      const note = await this.noteService.createNote(data);
      res.status(201).json(note);
    } catch (error) {
      next(error);
    }
  };

  updateNote = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const data: UpdateNoteDTO = req.body;
      const note = await this.noteService.updateNote(id, data);
      res.json(note);
    } catch (error) {
      next(error);
    }
  };

  deleteNote = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.noteService.deleteNote(Number(req.params.id));
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
