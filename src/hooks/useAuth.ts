import { supabase } from "@/service/supabase";

const useAuth = () => {
  const getLoginUser = async () => {
    const { data: user, error } = await supabase.auth.getSession();
    return user;
  };

  return { getLoginUser };
};

export default useAuth;
