import prismaClient from "../../prisma/index.js";

interface CategoryRequest {
  name: string;
}

class CreateCategoryService {
  async execute({ name }: CategoryRequest) {
    if (!name) {
      throw new Error("Nome da categoria inválido.");
    }
    const categoryAlreadyExists = await prismaClient.category.findFirst({
      where: { name: { mode: "insensitive" } },
    });
    if (!!categoryAlreadyExists) {
      throw new Error("Essa categoria ja existe.");
    }
    const category = await prismaClient.category.create({
      data: { name },
      select: { id: true, name: true },
    });
    return category;
  }
}

export { CreateCategoryService };
