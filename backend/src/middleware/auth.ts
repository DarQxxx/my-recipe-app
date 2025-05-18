import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer "))
    return res
      .status(401)
      .json({ error: "Brak lub nieprawidłowy token użytkownika" });

  try {
    const token = auth.split(" ")[1];
    const decoded = verifyToken(token);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Brak tokenu użytkownika" });
  }
};
