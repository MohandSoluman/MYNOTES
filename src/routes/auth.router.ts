import { UserRepository } from "../repositories/user.repositry";
import { Router } from "express";
import { UserController } from "../controllers/user.controller";
// import { authMiddleware } from "../middlewares/auth.middleware";
import { validateSchema } from "../middlewares/validation.middleware";
import {
  createUserSchema,
  updateUserSchema,
  assignGroupsSchema,
} from "../schemas/user.schema";
import { UserService } from "../services/user.service";
import { AuthController } from "../controllers/auth.controller";
import { AuthService } from "../services/auth.service";

const router = Router();
const userId = 2;
const userRepository = new UserRepository(userId);
const userService = new UserService(userRepository);
const authService = new AuthService(userService);
const authController = new AuthController(authService);

router.route("/").post(authController.login);

export default router;
