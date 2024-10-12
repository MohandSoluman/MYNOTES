import { BadRequestError, NotFoundError } from "../Errors/api.error";
import { CreateUserDTO, UpdateUserDTO } from "../interfaces/user.interface";
import { UserRepository } from "../repositories/user.repositry";

export class UserService {
  constructor(private repository: UserRepository) {}

  async create(data: CreateUserDTO) {
    return await this.repository.create(data);
  }

  async getById(id: number) {
    const user = await this.repository.findById(id);
    if (!user) {
      throw new NotFoundError("user not found");
    }
    return user;
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
}
