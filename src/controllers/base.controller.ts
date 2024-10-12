import { Request, Response, NextFunction } from "express";
import { APIError, BadRequestError, NotFoundError } from "../Errors/api.error";
import { HttpStatus } from "../Errors/error.status";

export abstract class BaseController<T, CreateDTO, UpdateDTO> {
  constructor(private service: any) {}

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = this.parseId(req.params.id);
      const entity = await this.service.getById(id);
      if (!entity) {
        throw new NotFoundError(`Entity with ID ${id} not found`);
      }
      res.json(entity);
    } catch (error) {
      if (error instanceof Error) {
        next(error);
      } else {
        next(
          new APIError("Unknown error occurred", HttpStatus.INTERNAL_SERVER)
        );
      }
    }
  };

  getAll = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const entities = await this.service.getAll();
      if (!entities || entities.length === 0) {
        throw new NotFoundError("No entities found");
      }
      res.json(entities);
    } catch (error) {
      next(this.handleError(error));
    }
  };

  create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const data = this.validateCreateDTO(req.body);
      const entity = await this.service.create(data);
      res.status(HttpStatus.CREATED).json(entity);
    } catch (error) {
      next(this.handleError(error));
    }
  };

  update = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const id = this.parseId(req.params.id);
      const data = this.validateUpdateDTO(req.body);

      const existingEntity = await this.service.getById(id);
      if (!existingEntity) {
        throw new NotFoundError(`Entity with ID ${id} not found`);
      }

      const entity = await this.service.update(id, data);
      res.json(entity);
    } catch (error) {
      next(this.handleError(error));
    }
  };

  delete = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const id = this.parseId(req.params.id);

      const existingEntity = await this.service.getById(id);
      if (!existingEntity) {
        throw new NotFoundError(`Entity with ID ${id} not found`);
      }

      await this.service.delete(id);
      res.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      next(this.handleError(error));
    }
  };

  protected parseId(id: string): number {
    const parsedId = Number(id);
    if (isNaN(parsedId)) {
      throw new BadRequestError(`Invalid ID format: ${id}`);
    }
    return parsedId;
  }

  protected validateCreateDTO(data: unknown): CreateDTO {
    if (!data || typeof data !== "object") {
      throw new BadRequestError("Invalid data format");
    }
    // Add more specific validation as needed
    return data as CreateDTO;
  }

  protected validateUpdateDTO(data: unknown): UpdateDTO {
    if (!data || typeof data !== "object") {
      throw new BadRequestError("Invalid data format");
    }
    if (Object.keys(data).length === 0) {
      throw new BadRequestError("Update data cannot be empty");
    }
    // Add more specific validation as needed
    return data as UpdateDTO;
  }

  protected handleError(error: unknown): Error {
    if (error instanceof Error) {
      return error;
    }
    return new APIError(
      "An unexpected error occurred",
      HttpStatus.INTERNAL_SERVER
    );
  }
}
