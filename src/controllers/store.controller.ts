import { StoreService } from "../services/store.service";
import { CreateStoreDTO, UpdateStoreDTO } from "../types/store.type";
import { BaseController } from "./base.controller";

export class StoreController extends BaseController<
  any,
  CreateStoreDTO,
  UpdateStoreDTO
> {
  constructor(private sroreService: StoreService) {
    super(sroreService);
  }
}
