import prismaClient from "../../prisma/index.js";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";

interface AuthRequest {
  email: string;
  password: string;
}

class AuthUserService {
  async execute({ email, password }: AuthRequest) {
    const user = await prismaClient.user.findFirst({
      where: { email },
    });
    if (!user) {
      throw new Error("Incorrect email or password");
    }

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Incorrect email or password");
    }

    const token = jwt.sign(
      { name: user.name, email: user.email },
      process.env.JWT_SECRET,
      { subject: user.id, expiresIn: "30d" }
    );

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token,
    };
  }
}

export { AuthUserService };
