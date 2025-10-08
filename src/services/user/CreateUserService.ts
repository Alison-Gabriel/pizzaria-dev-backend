import prismaClient from "../../prisma/index.js";
import { hash } from "bcryptjs";

interface UserRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ name, email, password }: UserRequest) {
    if (!email) {
      throw new Error("E-mail inválido.");
    }

    const userAlreadyExists = await prismaClient.user.findFirst({
      where: { email },
    });
    if (userAlreadyExists) {
      throw new Error("Usuário já existente.");
    }

    const hashPassword = await hash(password, 8);

    const user = await prismaClient.user.create({
      data: { name, email, password: hashPassword },
      select: { id: true, name: true, email: true },
    });

    return user;
  }
}

export { CreateUserService };
