import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { createContext } from "react";

export const supabaseClient = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_ANON_KEY
);

export const supabaseContext = createContext<SupabaseClient>(supabaseClient);