import express from "express";
import { registerUser } from "../../controllers/authController";

const router = express.Router();

// POST /register
// Create a new user
router.post("/", registerUser);

export default router;
