import type { Request, Response } from "express";
import { CreateProductService } from "../../services/product/CreateProductService.js";

class CreateProductController {
  async handle(req: Request, res: Response) {
    const { name, price, description, category_id } = req.body;

    const createProductService = new CreateProductService();

    if (!req.file) {
      throw new Error("Error on upload file");
    }

    const { filename: banner } = req.file;

    const product = await createProductService.execute({
      name,
      price,
      banner,
      description,
      category_id,
    });

    return res.status(201).json(product);
  }
}

export { CreateProductController };
