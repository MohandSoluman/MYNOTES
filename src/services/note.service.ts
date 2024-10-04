import { NoteRepository, CreateNoteDTO, UpdateNoteDTO } from "../types";
import { NotFoundError } from "../utils/error";

export class NoteService {
  constructor(private repository: NoteRepository) {}

  async getAllNotes() {
    return await this.repository.findAll();
  }

  async getNoteById(id: number) {
    const note = await this.repository.findById(id);
    if (!note) throw new NotFoundError("Note not found");
    return note;
  }

  async createNote(data: CreateNoteDTO) {
    return await this.repository.create(data);
  }

  async updateNote(id: number, data: UpdateNoteDTO) {
    const note = await this.repository.update(id, data);
    if (!note) throw new NotFoundError("Note not found");
    return note;
  }

  async deleteNote(id: number) {
    const success = await this.repository.delete(id);
    if (!success) throw new NotFoundError("Note not found");
  }
}
