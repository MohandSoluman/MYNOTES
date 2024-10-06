import { Request, Response, NextFunction } from "express";
import { StoreService } from "../services/store.service";
import { CreateStoreDTO, UpdateStoreDTO } from "../types/store.type";

export class StoreController {
  constructor(private sroreService: StoreService) {}

  getAllStores = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const srores = await this.sroreService.getAllStores();
      res.json(srores);
    } catch (error) {
      next(error);
    }
  };

  getStoreById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const srore = await this.sroreService.getStoreById(Number(req.params.id));
      res.json(srore);
    } catch (error) {
      next(error);
    }
  };

  createStore = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: CreateStoreDTO = req.body;
      const srore = await this.sroreService.createStore(data);
      res.status(201).json(srore);
    } catch (error) {
      next(error);
    }
  };

  updateStore = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const data: UpdateStoreDTO = req.body;
      const srore = await this.sroreService.updateStore(id, data);
      res.json(srore);
    } catch (error) {
      next(error);
    }
  };

  deleteStore = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.sroreService.deleteStore(Number(req.params.id));
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
