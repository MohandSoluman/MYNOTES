import { NoteService } from "../services/note.service";
import { CreateNoteDTO, UpdateNoteDTO } from "../interfaces/note.interface";
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
