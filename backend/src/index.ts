import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();
const app = express();
const prisma = new PrismaClient();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  const recipes = await prisma.recipe.findMany();
  res.json(recipes);
});

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
