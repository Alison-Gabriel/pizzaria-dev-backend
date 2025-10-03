import type { Request, Response } from "express";
import { DeleteOrderService } from "../../services/order/DeleteOrderService.js";

class DeleteOrderController {
  async handle(req: Request, res: Response) {
    const order_id = req.query.order_id as string;
    const deleteOrderService = new DeleteOrderService();
    const order = await deleteOrderService.execute({ order_id });
    return res.status(200).json(order);
  }
}

export { DeleteOrderController };
