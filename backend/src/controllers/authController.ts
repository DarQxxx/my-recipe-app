import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { generateToken } from "../utils/jwt";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET!;

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: "Email oraz hasło są wymagane" });

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser)
      return res.status(400).json({ error: "Ten adres email jest już zajęty" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({ token, email: newUser.email, id: newUser.id });
  } catch (error) {
    res.status(500).json({ error: "Błąd przy tworzeniu użytkownika" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
      return res
        .status(401)
        .json({ error: "Użytkownik o podanym emailu nie istnieje" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
      return res.status(401).json({ error: "Podane hasło jest nieprawidłowe" });

    const token = generateToken(user.id);

    res.status(200).json({ token, email: user.email, id: user.id });
  } catch (error) {
    res.status(500).json({ error: "Błąd przy logowaniu użytkownika" });
  }
};
