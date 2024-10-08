import { Request, Response, NextFunction } from "express";

export abstract class BaseController<T, CreateDTO, UpdateDTO> {
  constructor(private service: any) {
  }

  getAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const entities = await this.service.getAll();
      res.json(entities);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const entity = await this.service.getById(Number(req.params.id));
      res.json(entity);
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: CreateDTO = req.body;
      const entity = await this.service.create(data);
      res.status(201).json(entity);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const data: UpdateDTO = req.body;
      const entity = await this.service.update(id, data);
      res.json(entity);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.service.delete(Number(req.params.id));
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
