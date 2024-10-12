import { UserRepository } from "./../repositories/user.repositry";
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

/**
 * const router = Router();
const userId = 2;
const storeRepository = new StoreRepository(userId);
const storeService = new StoreService(storeRepository);
const storeController = new StoreController(storeService);
 */

const router = Router();
const userId = 2;
const userRepository = new UserRepository(userId);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.post(
  "/",

  validateSchema(createUserSchema),
  userController.create
);

router.get("/:id", userController.getById);

router.put(
  "/:id",

  validateSchema(updateUserSchema),
  userController.update
);

router.post(
  "/:id/groups",

  validateSchema(assignGroupsSchema),
  userController.assignUserToGroups
);

export default router;
