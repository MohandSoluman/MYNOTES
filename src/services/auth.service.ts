import { User } from "../model/user-management/user.model";
import { LoginDTO, RegisterDTO } from "../interfaces/user.interface";
import { UserRepository } from "../repositories/user.repositry";
import jwt from "jsonwebtoken";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../Errors/api.error";
import { UserService } from "./user.service";

export class AuthService {
  constructor(private userService: UserService) {}

  async login(loginData: LoginDTO): Promise<{ user: User; token: string }> {
    const { email, password } = loginData;
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    const token = this.generateToken(user);

    return { user: this.sanitizeUser(user), token };
  }

  async register(
    registerData: RegisterDTO //: Promise<User>
  ) {
    const { email, password, name } = registerData;

    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new BadRequestError("User with this email already exists");
    }

    const hashedPassword = "await jwt.hash(password, 10);";

    // const newUser = await this.userService.create({
    //   email,
    //   password: hashedPassword,
    //   user_namename,
    // });

    // return this.sanitizeUser(newUser);
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.userService.getById(id);
    if (!user) {
      throw new NotFoundError("User not found");
    }
    return this.sanitizeUser(user);
  }

  private generateToken(user: User): string {
    return jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );
  }

  private sanitizeUser(user: User): User {
    const { password, ...sanitizedUser } = user;
    return sanitizedUser as User;
  }
}
