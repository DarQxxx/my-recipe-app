import express from "express";
import { authenticate } from "../middleware/auth";
import {
  createRecipe,
  getAllRecipes,
  getRecipe,
  modifyRecipe,
  removeRecipe,
} from "../controllers/recipesController";

const router = express.Router();

// GET /recipes
// Get all recipes
router.get("/", authenticate, getAllRecipes);

// POST /recipes
// Create a new recipe
router.post("/", authenticate, createRecipe);

// GET /recipes/:id
// Fetch a single recipe by ID
router.get("/:id", authenticate, getRecipe);

// PUT /recipes/:id
// Modify a recipe
router.put("/:id", authenticate, modifyRecipe);

// DELETE /recipes/:id
// Delete a recipe
router.delete("/:id", authenticate, removeRecipe);

export default router;
