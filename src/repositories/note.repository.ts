import { Note } from "../model/note.model";
import { NoteRepository, CreateNoteDTO, UpdateNoteDTO } from "../types";

export class SequelizeNoteRepository implements NoteRepository {
  async create(data: CreateNoteDTO) {
    return await Note.create(data);
  }
  async findAll() {
    return await Note.findAll();
  }

  async findById(id: number) {
    return await Note.findByPk(id);
  }

  async update(id: number, data: UpdateNoteDTO) {
    const note = await Note.findByPk(id);
    if (!note) return null;
    return await note.update(data);
  }

  async delete(id: number) {
    const note = await Note.findByPk(id);
    if (!note) return false;
    await note.destroy();
    return true;
  }
}
