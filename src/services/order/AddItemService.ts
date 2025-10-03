import prismaClient from "../../prisma/index.js";

interface ItemRequest {
  amount: number;
  product_id: string;
  order_id: string;
}

class AddItemService {
  async execute({ amount, order_id, product_id }: ItemRequest) {
    const orderItem = prismaClient.item.create({
      data: { order_id, product_id, amount },
    });
    return orderItem;
  }
}

export { AddItemService };
