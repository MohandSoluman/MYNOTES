import { Request, Response, NextFunction } from 'express';
import { NotFoundError, ValidationError } from '../utils/error';

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error(err);

  if (err instanceof NotFoundError) {
    return res.status(404).json({ message: err.message });
  }

  if (err instanceof ValidationError) {
    return res.status(400).json({ message: err.message });
  }

  return res.status(500).json({ message: 'Internal server error' });
}