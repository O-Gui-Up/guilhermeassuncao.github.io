
import { createClient } from "@supabase/supabase-js";

const supabaseAuth = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false
    }
  }
);

export async function realizarLogin(req, res) {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({
        erro: "Email e senha são obrigatórios."
      });
    }

    const { data, error } = await supabaseAuth.auth.signInWithPassword({
      email,
      password: senha
    });

    if (error || !data.user || !data.session) {
      return res.status(401).json({
        erro: "Email ou senha incorretos."
      });
    }

    const usuarioAutorizado = process.env.SUPABASE_AUTHORIZED_USER_ID;

    if (data.user.id !== usuarioAutorizado) {
      return res.status(403).json({
        erro: "Esta conta não está autorizada a acessar o portfólio."
      });
    }

    return res.status(200).json({
      mensagem: "Login realizado com sucesso.",
      dados: {
        usuario: {
          id: data.user.id,
          email: data.user.email
        },
        sessao: {
          access_token: data.session.access_token,
          refresh_token: data.session.refresh_token,
          expires_at: data.session.expires_at
        }
      }
    });

  } catch (error) {
    console.error("Erro ao realizar login:", error.message);

    return res.status(500).json({
      erro: "Ocorreu um erro interno ao realizar o login."
    });
  }
}
