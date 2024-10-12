export interface INote {
  id?: number;
  title: string;
  content: string | null;
  created_at?: Date;
  updated_at?: Date;
}
export type CreateNoteDTO = Omit<INote, "id" | "created_at" | "updated_at">;
export interface UpdateNoteDTO {
  title?: string;
  content?: string;
}
export interface INoteRepository {
  findAll(): Promise<INote[]>;
  findById(id: number): Promise<INote | null>;
  create(data: CreateNoteDTO): Promise<INote>;
  update(id: number, data: UpdateNoteDTO): Promise<INote | null>;
  delete(id: number): Promise<boolean>;
}
