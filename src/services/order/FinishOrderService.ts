import prismaClient from "../../prisma/index.js";

interface OrderRequst {
  order_id: string;
}

class FinishOrderService {
  async execute({ order_id }: OrderRequst) {
    const order = await prismaClient.order.update({
      where: { id: order_id },
      data: { is_draft: false },
    });
    return order;
  }
}

export { FinishOrderService };
