import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import recipes from "./routes/recipes";
import register from "./routes/auth/register";
import login from "./routes/auth/login";

dotenv.config();
const app = express();
const helmet = require("helmet");
const PORT = process.env.PORT!;

app.set("trust proxy", true);
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(cors());
app.use(express.json());

// Use routes from register.ts
app.use("/register", register);

// Use routes from login.ts
app.use("/login", login);

// Use routes from recipe.ts
app.use("/recipes", recipes);

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
