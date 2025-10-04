import type { Request, Response } from "express";
import { OrderDetailsService } from "../../services/order/OrderDetailsService.js";

class OrderDetailsController {
  async handle(req: Request, res: Response) {
    const order_id = req.query.order_id as string;
    const orderDetailsService = new OrderDetailsService();
    const orderItems = await orderDetailsService.execute({ order_id });
    return res.status(200).json(orderItems);
  }
}

export { OrderDetailsController };
