import type { Request, Response } from "express";
import { CreateProductService } from "../../services/product/CreateProductService.js";

class CreateProductController {
  async handle(req: Request, res: Response) {
    const { name, price, description, category_id } = req.body;

    if (!name || !price || !description || !category_id) {
      throw new Error("Insira corretamente todos os dados do produto.");
    }

    const createProductService = new CreateProductService();

    if (!req.file) {
      throw new Error("Erro ao salvar imagem.");
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
