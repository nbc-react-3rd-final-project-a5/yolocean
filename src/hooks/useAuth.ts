import { supabase } from "@/service/supabase";

export const useAuth = () => {
  const getLoginUser = async () => {
    const { data: user, error } = await supabase.auth.getSession();
    return user.session?.user.id as string;
  };

  return { getLoginUser };
};
