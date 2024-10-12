import { body } from "express-validator";

export const createUserSchema = [
  body("user_name").isString().notEmpty(),
  body("email").isEmail(),
  body("password").isString().isLength({ min: 6 }),
  body("user_type_code").isString().notEmpty(),
];

export const updateUserSchema = [
  body("user_name").optional().isString(),
  body("email").optional().isEmail(),
  body("password").optional().isString().isLength({ min: 6 }),
];

export const assignGroupsSchema = [body("groupIds").isArray().notEmpty()];
