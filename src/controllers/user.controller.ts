import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service";
import { BaseController } from "./base.controller";
import { CreateUserDTO, UpdateUserDTO } from "../interfaces/user.interface";

export class UserController extends BaseController<
  any,
  CreateUserDTO,
  UpdateUserDTO
> {
  constructor(private userService: UserService) {
    super(userService);
  }

  async assignUserToGroups(req: Request, res: Response, next: NextFunction) {
    // try {
    //   const requestUserId = (req.user as any).id;
    //   await this.userService.assignUserToGroups(
    //     parseInt(req.params.id),
    //     req.body.groupIds,
    //     requestUserId
    //   );
    //   res.status(200).json({
    //     status: "success",
    //     message: "User assigned to groups successfully",
    //   });
    // } catch (error) {
    //   next(error);
    // }
  }
}
