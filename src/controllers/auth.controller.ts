import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service";
import { LoginDTO, RegisterDTO } from "../interfaces/user.interface";

import { BadRequestError } from "../Errors/api.error";
import { HttpStatus } from "../Errors/error.status";

export class AuthController {
  constructor(private authService: AuthService) {}

  login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const loginData = this.validateLoginDTO(req.body);
      const result = await this.authService.login(loginData);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const registerData = this.validateRegisterDTO(req.body);
      const user = await this.authService.register(registerData);
      res.status(HttpStatus.CREATED).json(user);
    } catch (error) {
      next(error);
    }
  };

  logout = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      // Assuming you're using JWT and storing it in a cookie
      res.clearCookie("jwt");
      res.status(HttpStatus.OK).json({ message: "Logged out successfully" });
    } catch (error) {
      next(error);
    }
  };

  protected validateLoginDTO(data: unknown): LoginDTO {
    if (!data || typeof data !== "object") {
      throw new BadRequestError("Invalid login data format");
    }
    const { email, password } = data as LoginDTO;
    if (!email || !password) {
      throw new BadRequestError("Email and password are required");
    }
    return { email, password };
  }

  protected validateRegisterDTO(data: unknown): RegisterDTO {
    if (!data || typeof data !== "object") {
      throw new BadRequestError("Invalid registration data format");
    }
    const { email, password, name } = data as RegisterDTO;
    if (!email || !password || !name) {
      throw new BadRequestError("Email, password, and name are required");
    }
    return { email, password, name };
  }
}
