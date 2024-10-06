import { Router } from "express";
import { StoreController } from "../controllers/store.controller";
import { StoreService } from "../services/store.service";
import { SequelizeStoreRepository } from "../repositories/store.repository";

const router = Router();

const storeRepository = new SequelizeStoreRepository();
const storeService = new StoreService(storeRepository);
const storeController = new StoreController(storeService);

router
  .route("/")
  .post(storeController.createStore)
  .get(storeController.getAllStores);
router
  .route("/:id")
  .get(storeController.getStoreById)
  .put(storeController.updateStore)
  .delete(storeController.deleteStore);

export default router;
