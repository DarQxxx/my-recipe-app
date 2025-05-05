import express from "express";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const router = express.Router();
const prisma = new PrismaClient();

// POST /recipe
// Create a new recipe
router.post("/", async (req: Request, res: Response) => {
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
});

// GET /recipe/:id
// Fetch a single recipe by ID
router.get("/:id", async (req, res) => {
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
});

export default router;
