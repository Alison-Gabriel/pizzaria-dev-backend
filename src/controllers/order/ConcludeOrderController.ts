import type { Request, Response } from "express";
import { ConcludeOrderService } from "../../services/order/ConcludeOrderService.js";

class ConcludeOrderController {
  async handle(req: Request, res: Response) {
    const { order_id } = req.body;
    const concludeOrderService = new ConcludeOrderService();
    const order = await concludeOrderService.execute({ order_id });
    return res.status(200).json(order);
  }
}

export { ConcludeOrderController };
