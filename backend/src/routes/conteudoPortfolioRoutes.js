
import { Router } from "express";

import {
  criarConteudo,
  obterConteudos,
  editarConteudo,
  removerConteudo
} from "../controllers/ConteudoPortfolioController.js";

import { autenticarUsuario } from "../middlewares/autenticarUsuario.js";

const router = Router();

// Listagem pública
router.get("/", obterConteudos);

// Cadastro protegido
router.post("/", autenticarUsuario, criarConteudo);

// Edição protegida
router.put("/:id", autenticarUsuario, editarConteudo);

// Exclusão protegida
router.delete("/:id", autenticarUsuario, removerConteudo);

export default router;
