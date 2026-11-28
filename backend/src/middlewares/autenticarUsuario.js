
import { createClient } from "@supabase/supabase-js";
import supabase from "../config/supabase.js";

export async function autenticarUsuario(req, res, next) {
  try {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.status(401).json({
        erro: "Token de autenticação não informado."
      });
    }

    const token = authorization.split(" ")[1];

    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      return res.status(401).json({
        erro: "Token inválido ou expirado."
      });
    }

    const usuarioAutorizado = process.env.SUPABASE_AUTHORIZED_USER_ID;

    if (!usuarioAutorizado) {
      return res.status(500).json({
        erro: "Identificador da conta autorizada não configurado."
      });
    }

    if (data.user.id !== usuarioAutorizado) {
      return res.status(403).json({
        erro: "Você não tem permissão para realizar esta operação."
      });
    }

    // Cria um cliente Supabase vinculado ao usuário autenticado
    req.supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY,
      {
        global: {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      }
    );

    req.usuario = data.user;

    next();

  } catch (error) {
    console.error("Erro na autenticação:", error.message);

    return res.status(500).json({
      erro: "Erro interno ao verificar a autenticação."
    });
  }
}
