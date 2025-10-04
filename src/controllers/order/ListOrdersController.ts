import type { Request, Response } from "express";
import { ListOrdersService } from "../../services/order/ListOrdersService.js";

class ListOrdersController {
  async handle(_req: Request, res: Response) {
    const listOrdersService = new ListOrdersService();
    const orders = await listOrdersService.execute();
    return res.status(200).json(orders);
  }
}

export { ListOrdersController };
