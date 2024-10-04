export interface NoteType {
  id?: number; // Auto-generated, should be optional
  title: string;
  content: string | null;
  created_at?: Date; // Optional because Sequelize will manage this
  updated_at?: Date; // Optional because Sequelize will manage this
}

export type CreateNoteDTO = Omit<NoteType, "id" | "created_at" | "updated_at">;

export interface UpdateNoteDTO {
  title?: string;
  content?: string;
}

export interface NoteRepository {
  findAll(): Promise<NoteType[]>;
  findById(id: number): Promise<NoteType | null>;
  create(data: CreateNoteDTO): Promise<NoteType>;
  update(id: number, data: UpdateNoteDTO): Promise<NoteType | null>;
  delete(id: number): Promise<boolean>;
}
