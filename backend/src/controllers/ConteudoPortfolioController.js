
import {
  cadastrarConteudo,
  listarConteudos,
  atualizarConteudo,
  excluirConteudo
} from "../services/ConteudoPortfolioService.js";

import supabase from "../config/supabase.js";

export async function criarConteudo(req, res) {
  try {
    const conteudo = await cadastrarConteudo(
      req.body,
      req.usuario.id,
      req.supabase
    );

    return res.status(201).json({
      mensagem: "Conteúdo cadastrado com sucesso.",
      dados: conteudo
    });

  } catch (error) {
    console.error("Erro ao cadastrar conteúdo:", error.message);

    const status = error.status || 400;

    return res.status(status).json({
      erro: error.message
    });
  }
}

export async function obterConteudos(req, res) {
  try {
    const conteudos = await listarConteudos(supabase);

    return res.status(200).json({
      dados: conteudos
    });

  } catch (error) {
    console.error("Erro ao listar conteúdos:", error.message);

    return res.status(500).json({
      erro: "Não foi possível consultar os conteúdos."
    });
  }
}

export async function editarConteudo(req, res) {
  try {
    const conteudo = await atualizarConteudo(
      req.params.id,
      req.body,
      req.usuario.id,
      req.supabase
    );

    return res.status(200).json({
      mensagem: "Conteúdo atualizado com sucesso.",
      dados: conteudo
    });

  } catch (error) {
    console.error("Erro ao atualizar conteúdo:", error.message);

    return res.status(error.status || 500).json({
      erro: error.message
    });
  }
}

export async function removerConteudo(req, res) {
  try {
    const conteudo = await excluirConteudo(
      req.params.id,
      req.usuario.id,
      req.supabase
    );

    return res.status(200).json({
      mensagem: "Conteúdo excluído com sucesso.",
      dados: conteudo
    });

  } catch (error) {
    console.error("Erro ao excluir conteúdo:", error.message);

    return res.status(error.status || 500).json({
      erro: error.message
    });
  }
}
