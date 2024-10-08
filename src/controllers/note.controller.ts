import { NoteService } from "../services/note.service";
import { CreateNoteDTO, UpdateNoteDTO } from "../types/note.type";
import { BaseController } from "./base.controller";

export class NoteController extends BaseController<
  any,
  CreateNoteDTO,
  UpdateNoteDTO
> {
  constructor(private noteService: NoteService) {
    super(noteService);
  }
}
