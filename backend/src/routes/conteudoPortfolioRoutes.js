
import { Router } from "express";
import { criarConteudo } from "../controllers/ConteudoPortfolioController.js";

const router = Router();

router.post("/", criarConteudo);

export default router;
