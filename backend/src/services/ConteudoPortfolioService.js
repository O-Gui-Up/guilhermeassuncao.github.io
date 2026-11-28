
import ConteudoPortfolio from "../models/ConteudoPortfolio.js";

export async function cadastrarConteudo(dados, idUsuario, supabase) {
  const conteudo = new ConteudoPortfolio(dados);

  const { data, error } = await supabase
    .from("conteudos_portfolio")
    .insert({
      secao: conteudo.secao,
      bimestre: conteudo.bimestre,
      area_conhecimento: conteudo.area_conhecimento,
      descricao: conteudo.descricao,
      id_usuario: idUsuario
    })
    .select()
    .single();

  if (error) {
    const erroBanco = new Error(error.message);
    erroBanco.status = 500;

    throw erroBanco;
  }

  return data;
}

export async function listarConteudos(supabase) {
  const { data, error } = await supabase
    .from("conteudos_portfolio")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    const erroBanco = new Error(error.message);
    erroBanco.status = 500;

    throw erroBanco;
  }

  return data;
}

export async function obterConteudoPorId(id, supabase) {
  const { data, error } = await supabase
    .from("conteudos_portfolio")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    const erroBanco = new Error(error.message);
    erroBanco.status = 500;

    throw erroBanco;
  }

  if (!data) {
    const erro = new Error("Conteúdo não encontrado.");
    erro.status = 404;

    throw erro;
  }

  return data;
}

export async function atualizarConteudo(id, dados, idUsuario, supabase) {
  const conteudo = new ConteudoPortfolio(dados);

  const { data, error } = await supabase
    .from("conteudos_portfolio")
    .update({
      secao: conteudo.secao,
      bimestre: conteudo.bimestre,
      area_conhecimento: conteudo.area_conhecimento,
      descricao: conteudo.descricao
    })
    .eq("id", id)
    .eq("id_usuario", idUsuario)
    .select()
    .maybeSingle();

  if (error) {
    const erroBanco = new Error(error.message);
    erroBanco.status = 500;

    throw erroBanco;
  }

  if (!data) {
    const erro = new Error("Conteúdo não encontrado.");
    erro.status = 404;

    throw erro;
  }

  return data;
}

export async function excluirConteudo(id, idUsuario, supabase) {
  const { data, error } = await supabase
    .from("conteudos_portfolio")
    .delete()
    .eq("id", id)
    .eq("id_usuario", idUsuario)
    .select()
    .maybeSingle();

  if (error) {
    const erroBanco = new Error(error.message);
    erroBanco.status = 500;

    throw erroBanco;
  }

  if (!data) {
    const erro = new Error("Conteúdo não encontrado.");
    erro.status = 404;

    throw erro;
  }

  return data;
}
