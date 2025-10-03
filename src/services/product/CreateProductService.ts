import prismaClient from "../../prisma/index.js";

interface ProductRequest {
  name: string;
  price: string;
  banner: string;
  description: string;
  category_id: string;
}

class CreateProductService {
  async execute({
    name,
    price,
    description,
    banner,
    category_id,
  }: ProductRequest) {
    const product = await prismaClient.product.create({
      data: { name, description, price, banner, category_id },
    });
    return product;
  }
}

export { CreateProductService };
