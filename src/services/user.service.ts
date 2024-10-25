import { promisify } from "util";
import { BadRequestError, NotFoundError } from "../Errors/api.error";
import { CreateUserDTO, UpdateUserDTO } from "../interfaces/user.interface";
import { UserRepository } from "../repositories/user.repositry";
import { scrypt, randomBytes } from "crypto";

const scryptAsync = promisify(scrypt);
export class UserService {
  constructor(private repository: UserRepository) {}

  private async hashPassword(password: string): Promise<string> {
    const salt = randomBytes(16).toString("hex");
    const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer;
    return `${salt}:${derivedKey.toString("hex")}`;
  }
  async create(data: CreateUserDTO) {
    const { password, ...userData } = data;
    const hashedPassword = await this.hashPassword(password);
    return await this.repository.create({
      ...userData,
      password: hashedPassword,
    });
    // return await this.repository.create(data);
  }

  async getAll() {
    return await this.repository.findAll();
  }

  async getById(id: number) {
    const user = await this.repository.findById(id);
    if (!user) {
      throw new NotFoundError("user not found");
    }
    return user;
  }

  async delete(id: number) {
    const success = await this.repository.delete(id);
    if (!success) throw new NotFoundError("user not found");
    return true;
  }

  async update(id: number, data: UpdateUserDTO) {
    const user = await this.repository.update(id, data);
    if (!user) throw new NotFoundError("user not found");
    return user;
  }

  async assignUserToGroups(userId: number, groupIds: number[]): Promise<void> {
    try {
      await this.repository.assignUserToGroups(userId, groupIds);
    } catch (error) {
      throw new BadRequestError("Failed to assign user to groups");
    }
  }

  async findByEmail(email: string) {
    return await this.repository.findByEmail(email);
  }
}
