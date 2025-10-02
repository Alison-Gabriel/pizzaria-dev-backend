import { Router } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController.js";
import { AuthUserController } from "./controllers/user/AuthUserController.js";

const router = Router();

// User routes
router.post("/users", new CreateUserController().handle);
router.post("/session", new AuthUserController().handle);

export { router };
