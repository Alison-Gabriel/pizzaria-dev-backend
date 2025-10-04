import prismaClient from "../../prisma/index.js";

interface OrderRequest {
  order_id: string;
}

class OrderDetailsService {
  async execute({ order_id }: OrderRequest) {
    const orderItems = await prismaClient.item.findMany({
      where: { order_id },
      include: { product: true, order: true },
    });
    return orderItems;
  }
}

export { OrderDetailsService };
