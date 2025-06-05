import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllRecipes = async (req: Request, res: Response) => {
  try {
    const recipes = await prisma.recipe.findMany();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ error: "Problem z pobieraniem przepisów" });
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
      return res.status(404).json({ error: "Przepis nie istnieje" });
    }

    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ error: "Problem z pobieraniem przepisu" });
  }
};

export const createRecipe = async (req: Request, res: Response) => {
  try {
    const { name, steps, tags, description, ingredients, imageUrl } = req.body;
    const userId = Number(req.userId);
    if (!userId) return res.status(401).json({ error: "Problem autoryzacji" });
    if (!name || !steps) {
      return res.status(400).json({ error: "Wszystkie pola są wymagane" });
    }
    const recipe = await prisma.recipe.create({
      data: {
        name,
        steps,
        description,
        ingredients,
        tags,
        imageUrl,
        userId,
      },
    });
    res.status(201).json(recipe);
  } catch (error) {
    console.error("Błąd dodawania przepisu:", error);
    res.status(500).json({ error: "Problem z dodawaniem przepisu" });
  }
};

export const modifyRecipe = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { name, steps, tags, description, ingredients, imageUrl } = req.body;
    if (!name || !steps) {
      return res.status(400).json({ error: "Wszystkie pola są wymagane" });
    }

    const userId = Number(req.userId);
    if (!userId) return res.status(401).json({ error: "Problem autoryzacji" });

    const recipe = await prisma.recipe.update({
      where: { id: parseInt(id) },
      data: {
        name,
        steps,
        description,
        ingredients,
        tags,
        imageUrl,
        userId,
      },
    });

    res.status(201).json(recipe);
  } catch (error) {
    console.error("Błąd przy edytowaniu przepisu:", error);
    res.status(500).json({ error: "Problem z edycją przepisu" });
  }
};

export const removeRecipe = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.recipe.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: "Przepis został usunięty" });
  } catch (error) {
    res.status(500).json({ error: "Problem z usuwaniem przepisu" });
  }
};
