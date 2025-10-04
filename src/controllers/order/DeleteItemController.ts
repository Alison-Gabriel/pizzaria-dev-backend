import type { Request, Response } from "express";
import { DeleteItemService } from "../../services/order/DeleteItemService.js";

class DeleteItemController {
  async handle(req: Request, res: Response) {
    const item_id = req.query.item_id as string;
    const deleteItemService = new DeleteItemService();
    const orderItem = await deleteItemService.execute({ item_id });
    return res.status(200).json(orderItem);
  }
}

export { DeleteItemController };
