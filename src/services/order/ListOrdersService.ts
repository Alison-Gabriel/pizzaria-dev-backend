import prismaClient from "../../prisma/index.js";

class ListOrdersService {
  async execute() {
    const orders = await prismaClient.order.findMany({
      where: { is_draft: false, is_done: false },
      orderBy: { created_at: "desc" },
    });
    return orders;
  }
}

export { ListOrdersService };
