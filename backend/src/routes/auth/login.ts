import express from "express";
import { loginUser } from "../../controllers/authController";

const router = express.Router();

// POST /login
// Authenticate a user
router.post("/", loginUser);

export default router;
