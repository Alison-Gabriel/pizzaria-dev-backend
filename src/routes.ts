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
import { ListOrdersController } from "./controllers/order/ListOrdersController.js";
import { OrderDetailsController } from "./controllers/order/OrderDetailsController.js";

const router = Router();
const upload = multer(uploadConfig.upload("tmp"));

// User
router.post("/user", new CreateUserController().handle);
router.post("/auth", new AuthUserController().handle);
router.get("/me", isAuthenticated, new DetailUserController().handle);

// Category
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

// Product
router.get("/products", isAuthenticated, new ListByCategoryController().handle);
router.post(
  "/product",
  isAuthenticated,
  upload.single("file"),
  new CreateProductController().handle
);

// Order
router.post("/order", isAuthenticated, new CreateOrderController().handle);
router.delete("/order", isAuthenticated, new DeleteOrderController().handle);
router.get("/orders", isAuthenticated, new ListOrdersController().handle);
router.patch(
  "/order/finish",
  isAuthenticated,
  new FinishOrderController().handle
);
router.patch("/order/conclude");

// Order => Item
router.post("/order/item", isAuthenticated, new AddItemController().handle);
router.delete(
  "/order/item",
  isAuthenticated,
  new DeleteItemController().handle
);
router.get(
  "/order/items",
  isAuthenticated,
  new OrderDetailsController().handle
);

export { router };
