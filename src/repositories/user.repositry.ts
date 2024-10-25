import { User } from "../model/user-management/user.model";
import { IUser } from "../interfaces/user.interface";
import { Group } from "../model/user-management/group.model";
import { Role } from "../model/user-management/role.model";
import { UserGroup } from "../model/user-management/user-group.model";
import { logger } from "../utils/logger";
import { BaseRepository } from "./base.repository";

export class UserRepository
  extends BaseRepository<User>
  implements UserRepository
{
  constructor(userId: number) {
    super(User, userId, "User");
  }

  async assignUserToGroups(userId: number, groupIds: number[]): Promise<void> {
    try {
      await UserGroup.destroy({ where: { user_id: userId } });
      await UserGroup.bulkCreate(
        groupIds.map((groupId, index) => ({
          id: index + 1,
          user_id: userId,
          group_id: groupId,
        }))
      );
    } catch (error) {
      logger.error("Error in assignUserToGroups repository", error as any);
      throw error;
    }
  }

  async findByEmail(email: string) {
    try {
      logger.info("Finding user by email", email);
      return await User.findOne({ where: { email } });
    } catch (error) {
      logger.error("Failed to find user by email", { error, email } as any);
      throw error;
    }
  }
}
