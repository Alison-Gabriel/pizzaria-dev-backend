import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface Payload {
  sub: string;
}

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authToken = req.headers.authorization;
  if (!authToken) {
    return res.status(401).end();
  }

  const token = authToken.replace(/\s?Bearer\s?/, "");

  try {
    const { sub } = jwt.verify(token, process.env.JWT_SECRET) as Payload;

    req.user_id = sub;

    return next();
  } catch (err) {
    return res.status(400).end();
  }
};
