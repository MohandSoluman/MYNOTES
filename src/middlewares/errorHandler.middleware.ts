import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { BaseError } from "../Errors/base.error";
import { HttpStatus } from "../Errors/error.status";

export const errorHandlerMW: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof BaseError) {
    res.status(err.httpCode).json({
      status: "error",
      message: err.message,
    });
    return;
  }

  res.status(HttpStatus.INTERNAL_SERVER).json({
    status: "error",
    message: "Internal server error",
  });
};
