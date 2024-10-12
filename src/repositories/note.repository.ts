import { Note } from "../model/note.model";
import { INoteRepository } from "../interfaces/note.interface";
import { BaseRepository } from "./base.repository";

export class NoteRepository
  extends BaseRepository<Note>
  implements INoteRepository
{
  constructor(userId: number) {
    super(Note, userId, "Note");
  }

  // async create(data: Omit<CreateNoteDTO, "id">) {
  //   try {
  //     // const book = await Book.findByPk(data.bookId);
  //     // if (!book) {
  //     //   logger.error("Book not found for note creation", {
  //     //     bookId: data.bookId,
  //     //   });
  //     //   throw new Error(`Book with id ${data.bookId} does not exist`);
  //     // }
  //     return super.create(data);
  //   } catch (error) {
  //     logger.error("Failed to create note", { error, data } as any);
  //     throw error;
  //   }
  // }

  // async findByBookId(bookId: number) {
  //   try {
  //     logger.info('Finding notes by book ID',  bookId );
  //     return await this.model.findAll({
  //       where: { bookId }
  //     });
  //   } catch (error) {
  //     logger.error('Failed to find notes by book ID', { error, bookId });
  //     throw error;
  //   }
  // }
}
