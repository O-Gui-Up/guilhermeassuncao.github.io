
import "dotenv/config";
import supabase from "./supabase.js";

async function testarConexao() {
    console.log("Testando conexão com o Supabase...");

    const { data, error } = await supabase
        .from("conteudos_portfolio")
        .select("id")
        .limit(1);

    if (error) {
        console.error("Erro na conexão:", error.message);
        return;
    }

    console.log("Conexão com o Supabase estabelecida!");
    console.log("Consulta realizada com sucesso.");
    console.log("Registros encontrados:", data.length);
}

testarConexao();
