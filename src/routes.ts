import { Router } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController.js";
import { AuthUserController } from "./controllers/user/AuthUserController.js";
import { DetailUserController } from "./controllers/user/DetailUserController.js";
import { isAuthenticated } from "./middlewares/isAuthenticated.js";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController.js";
import { ListCategoriesController } from "./controllers/category/ListCategoriesController.js";
import { CreateProductController } from "./controllers/product/CreateProductController.js";
import uploadConfig from "./config/multer.js";
import multer from "multer";
import { ListByCategoryController } from "./controllers/product/ListByCategoryController.js";
import { CreateOrderController } from "./controllers/order/CreateOrderController.js";
import { DeleteOrderController } from "./controllers/order/DeleteOrderController.js";
import { AddItemController } from "./controllers/order/AddItemController.js";
import { DeleteItemController } from "./controllers/order/DeleteItemController.js";
import { FinishOrderController } from "./controllers/order/FinishOrderController.js";

const router = Router();
const upload = multer(uploadConfig.upload("tmp"));

router.post("/user", new CreateUserController().handle);
router.post("/session", new AuthUserController().handle);
router.get("/me", isAuthenticated, new DetailUserController().handle);

router.post(
  "/category",
  isAuthenticated,
  new CreateCategoryController().handle
);
router.get(
  "/categories",
  isAuthenticated,
  new ListCategoriesController().handle
);

router.post(
  "/product",
  isAuthenticated,
  upload.single("file"),
  new CreateProductController().handle
);
router.get("/products", isAuthenticated, new ListByCategoryController().handle);

router.post("/order", isAuthenticated, new CreateOrderController().handle);
router.delete("/order", isAuthenticated, new DeleteOrderController().handle);
router.patch("/order", isAuthenticated, new FinishOrderController().handle);

router.post("/order-item", isAuthenticated, new AddItemController().handle);
router.delete(
  "/order-item",
  isAuthenticated,
  new DeleteItemController().handle
);

export { router };
