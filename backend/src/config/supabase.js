
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error(
        "As variáveis SUPABASE_URL e SUPABASE_ANON_KEY precisam estar configuradas."
    );
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
