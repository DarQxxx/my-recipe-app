import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET!;

export const getAllRecipes = async (req: Request, res: Response) => {
  try {
    const recipes = await prisma.recipe.findMany();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
};

export const getRecipe = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const recipe = await prisma.recipe.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch recipe" });
  }
};

export const createRecipe = async (req: Request, res: Response) => {
  try {
    const { name, steps, tags, imageUrl, userId } = req.body;
    if (!name || !steps || !userId) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const recipe = await prisma.recipe.create({
      data: {
        name,
        steps,
        tags,
        imageUrl,
        userId,
      },
    });
    res.status(201).json(recipe);
  } catch (error) {
    console.error("Błąd dodawania przepisu:", error);
    res.status(500).json({ error: "Failed to create recipe" });
  }
};
