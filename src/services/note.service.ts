import { CreateNoteDTO, UpdateNoteDTO } from "../interfaces/note.interface";
import { NotFoundError } from "../Errors/api.error";
import { NoteRepository } from "../repositories/note.repository";

export class NoteService {
  constructor(private repository: NoteRepository) {}

  async getAll() {
    return await this.repository.findAll();
  }

  async getById(id: number) {
    const note = await this.repository.findById(id);
    if (!note) throw new NotFoundError("Note not found");
    return note;
  }

  async create(data: CreateNoteDTO) {
    return await this.repository.create(data);
  }

  async update(id: number, data: UpdateNoteDTO) {
    const note = await this.repository.update(id, data);
    if (!note) throw new NotFoundError("Note not found");
    return note;
  }

  async delete(id: number) {
    const success = await this.repository.delete(id);
    if (!success) throw new NotFoundError("Note not found");
  }
}
