
import { Router } from "express";
import { realizarLogin } from "../controllers/AuthController.js";

const router = Router();

// Login da conta autorizada
router.post("/login", realizarLogin);

export default router;
