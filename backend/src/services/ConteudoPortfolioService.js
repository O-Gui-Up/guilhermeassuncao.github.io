
import ConteudoPortfolio from "../models/ConteudoPortfolio.js";

const conteudos = [];

export function cadastrarConteudo(dados) {
  const conteudo = new ConteudoPortfolio(dados);

  conteudos.push(conteudo);

  return conteudo;
}

export function listarConteudos() {
  return [...conteudos];
}
