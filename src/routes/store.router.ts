import { Router } from "express";
import { StoreController } from "../controllers/store.controller";
import { StoreService } from "../services/store.service";
import { SequelizeStoreRepository } from "../repositories/store.repository";

const router = Router();
const userId = 2;
const storeRepository = new SequelizeStoreRepository(userId);
const storeService = new StoreService(storeRepository);
const storeController = new StoreController(storeService);

router.route("/").post(storeController.create).get(storeController.getAll);
router
  .route("/:id")
  .get(storeController.getById)
  .put(storeController.update)
  .delete(storeController.delete);

export default router;
