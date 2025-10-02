import cors from "cors";
import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { router } from "./routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({ error: err.message });
  }
  return res.status(500).json({
    status: "Error",
    message: "Internal server error.",
  });
});

app.listen(3333, () => console.log("Server running at 3333 port"));
