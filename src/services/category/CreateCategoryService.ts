import prismaClient from "../../prisma/index.js";

interface CategoryRequest {
  name: string;
}

class CreateCategoryService {
  async execute({ name }: CategoryRequest) {
    if (!name) {
      throw new Error("Invalid name");
    }
    const category = await prismaClient.category.create({
      data: { name },
      select: { id: true, name: true },
    });
    return category;
  }
}

export { CreateCategoryService };
