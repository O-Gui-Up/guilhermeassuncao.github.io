
import { cadastrarConteudo } from "../services/ConteudoPortfolioService.js";

export function criarConteudo(req, res) {
  try {
    const conteudo = cadastrarConteudo(req.body);

    return res.status(201).json({
      mensagem: "Conteúdo cadastrado com sucesso.",
      dados: conteudo
    });
  } catch (error) {
    return res.status(400).json({
      erro: error.message
    });
  }
}
