import prismaClient from "../../prisma/index.js";

interface OrderRequest {
  order_id: string;
}

class ConcludeOrderService {
  async execute({ order_id }: OrderRequest) {
    const order = await prismaClient.order.update({
      where: { id: order_id },
      data: { is_done: true },
    });
    return order;
  }
}

export { ConcludeOrderService };
