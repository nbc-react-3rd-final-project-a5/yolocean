import { supabase } from "@/service/supabase";

const useAuth = () => {
  const getLoginUserId = async () => {
    const { data: user, error } = await supabase.auth.getSession();
    return user.session?.user.id as string;
  };

  return { getLoginUserId };
};

export default useAuth;
