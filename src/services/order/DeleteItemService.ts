import prismaClient from "../../prisma/index.js";

interface ItemRequest {
  item_id: string;
}

class DeleteItemService {
  async execute({ item_id }: ItemRequest) {
    const orderItem = await prismaClient.item.delete({
      where: { id: item_id },
    });
    return orderItem;
  }
}

export { DeleteItemService };
