import { BaseError } from "./base.error";
import { HttpStatus } from "./error.status";

export class APIError extends BaseError {
  constructor(
    name: string,
    httpCode: HttpStatus = HttpStatus.INTERNAL_SERVER,
    description: string = "internal server error",
    isOperational: boolean = true
  ) {
    super(name, httpCode, description, isOperational);
  }
}

// Usage examples
export class NotFoundError extends APIError {
  constructor(description: string = "Not found") {
    super("NOT_FOUND", HttpStatus.NOT_FOUND, description, true);
  }
}

export class BadRequestError extends APIError {
  constructor(description: string = "Bad request") {
    super("BAD_REQUEST", HttpStatus.BAD_REQUEST, description, true);
  }
}

export class UnauthorizedError extends APIError {
  constructor(description: string = "Unauthorized") {
    super("UNAUTHORIZED", HttpStatus.UNAUTHORIZED, description, true);
  }
}
