//SUPABASE SECRET KEY
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

const NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const NEXT_PUBLIC_SUPABASE_SECRET_KEY = process.env.NEXT_PUBLIC_SUPABASE_SECRET_KEY || "";

export const secretbase = createClient<Database>(NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_SECRET_KEY);
