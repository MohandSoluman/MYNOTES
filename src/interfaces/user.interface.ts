export interface IUser {
  id: number;
  user_name: string;
  user_type_code: string;
  email: string;
  password: string;
  isActive: boolean;
  create_by: number;
  created_at: Date;
  updated_at: Date;
}
export type CreateUserDTO = Omit<IUser, "id" | "created_at" | "updated_at">;
export interface UpdateUserDTO {
  user_name?: string;
  email?: string;
  password?: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
}
export interface IUserRepository {
  findAll(): Promise<IUser[]>;
  findById(id: number): Promise<IUser | null>;
  create(data: CreateUserDTO): Promise<IUser>;
  update(id: number, data: UpdateUserDTO): Promise<IUser | null>;
  delete(id: number): Promise<boolean>;
}

export interface IUserType {
  id: number;
  name: string;
  code: string;
}

export interface IGroup {
  id: number;
  group_name: string;
}

export interface IRole {
  id: number;
  role_name: string;
}

export interface IGroupRole {
  id: number;
  group_id: number;
  role_id: number;
}

export interface IUserGroup {
  id: number;
  user_id: number;
  group_id: number;
}
